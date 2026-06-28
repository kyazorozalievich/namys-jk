import React, { useEffect, useState } from "react";
import { db } from "../../firebase/FireBase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  writeBatch,
  increment,
} from "firebase/firestore";
import scss from "./AdminPage.module.scss";

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeSection, setActiveSection] = useState("ads");
  const [carFilter, setCarFilter] = useState("all");

  // 1. Подписка на машины
  useEffect(() => {
    const unsubscribeCars = onSnapshot(collection(db, "cars"), (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => {
        carsData.push({ id: doc.id, ...doc.data() });
      });
      setCars(carsData);
      setLoadingCars(false);
    });
    return () => unsubscribeCars();
  }, []);

  // 2. Подписка на пользователей
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
      setLoadingUsers(false);
    });
    return () => unsubscribeUsers();
  }, []);

  /* ================= УПРАВЛЕНИЕ ОБЪЯВЛЕНИЯМИ ================= */
  const handleVerify = async (carId, currentStatus) => {
    try {
      await updateDoc(doc(db, "cars", carId), { verified: !currentStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleVip = async (carId, currentVipStatus) => {
    try {
      await updateDoc(doc(db, "cars", carId), { isVip: !currentVipStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCar = async (car) => {
    if (window.confirm("Удалить объявление и вернуть пользователю лимит?")) {
      try {
        // 1. Сначала удаляем саму машину из коллекции "cars"
        await deleteDoc(doc(db, "cars", car.id));
        console.log("Объявление успешно удалено.");

        // 2. Возвращаем лимит пользователю (уменьшаем adsUsed на 1)
        // Проверяем, по какому полю мы ищем пользователя: по authorId или по authorEmail
        if (car.authorId) {
          // Если в машине сохранен ID автора
          const userRef = doc(db, "users", car.authorId);
          await updateDoc(userRef, {
            adsUsed: increment(-1), // Уменьшаем на 1
          });
          console.log("Лимит пользователя успешно возвращен (по ID).");
        } else if (car.authorEmail) {
          // Если ID нет, но есть email (ищем пользователя по email)
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", car.authorEmail),
          );
          const userSnapshot = await getDocs(userQuery);

          if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userRef = doc(db, "users", userDoc.id);
            await updateDoc(userRef, {
              adsUsed: increment(-1), // Уменьшаем на 1
            });
            console.log("Лимит пользователя успешно возвращен (по Email).");
          }
        }
      } catch (e) {
        console.error("Ошибка при удалении машины или обновлении лимита:", e);
      }
    }
  };

  /* ================= УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ (ТВОИ КЛЮЧИ) ================= */

  // Смена Роли (admin / member)
  const handleUpdateRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "member" : "admin";
    if (window.confirm(`Поменять роль на ${newRole}?`)) {
      try {
        await updateDoc(doc(db, "users", userId), { role: newRole });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Смена Тарифа (plan: "free" <-> "vip") + автоматическое изменение лимита adsLimit
  const handleToggleUserPlan = async (userId, currentPlan) => {
    const newPlan = currentPlan === "vip" ? "free" : "vip";
    const newLimit = newPlan === "vip" ? 20 : 10; // Если VIP — даем 20 лимит, если обычный — 3

    try {
      await updateDoc(doc(db, "users", userId), {
        plan: newPlan,
        adsLimit: newLimit,
      });
    } catch (e) {
      console.error("Ошибка смены тарифа:", e);
    }
  };

  // Смена Статуса Активации (marketStatus: "active", "pending", "restricted")
  const handleUpdateMarketStatus = async (userId, newStatus) => {
    try {
      await updateDoc(doc(db, "users", userId), { marketStatus: newStatus });
    } catch (e) {
      console.error("Ошибка изменения статуса:", e);
    }
  };

  // Бан / Разбан пользователя + автоматическое скрытие/возврат машин на рынок
  const handleToggleBan = async (user) => {
    const userId = user.id;
    const userEmail = user.email;
    const currentBanStatus = user.isBanned;
    const willBan = !currentBanStatus;

    if (
      window.confirm(
        willBan
          ? "ЗАБЛОКИРОВАТЬ пользователя, сбросить его тариф и снять с рынка ВСЕ его машины?"
          : "Разблокировать пользователя и вернуть его машины на рынок?",
      )
    ) {
      try {
        const updateData = { isBanned: willBan };

        if (willBan) {
          updateData.plan = "free";
          updateData.adsLimit = 10;
          updateData.marketStatus = "restricted";
        } else {
          updateData.marketStatus = "active"; // При разбане возвращаем активный статус
        }

        // 1. Обновляем статус самого пользователя в базе
        await updateDoc(doc(db, "users", userId), updateData);

        // 2. Обновляем статус всех его машин (false при бане, true при разбане)
        const batch = writeBatch(db);
        let hasCarsToUpdate = false;
        const targetVerifiedStatus = !willBan; // true если разбан, false если бан

        // Поиск по email
        if (userEmail) {
          const qByEmail = query(
            collection(db, "cars"),
            where("authorEmail", "==", userEmail),
          );
          const snapshotByEmail = await getDocs(qByEmail);
          snapshotByEmail.forEach((carDoc) => {
            batch.update(doc(db, "cars", carDoc.id), {
              verified: targetVerifiedStatus,
            });
            hasCarsToUpdate = true;
          });
        }

        // Поиск по id
        const qById = query(
          collection(db, "cars"),
          where("authorId", "==", userId),
        );
        const snapshotById = await getDocs(qById);
        snapshotById.forEach((carDoc) => {
          batch.update(doc(db, "cars", carDoc.id), {
            verified: targetVerifiedStatus,
          });
          hasCarsToUpdate = true;
        });

        // Если машины нашлись, отправляем изменения пакетно
        if (hasCarsToUpdate) {
          await batch.commit();
          console.log(
            willBan
              ? "Все объявления забаненного пользователя успешно скрыты."
              : "Все объявления разбаненного пользователя вернулись на рынок.",
          );
        }
      } catch (e) {
        console.error(
          "Ошибка при блокировке/разблокировке и обновлении объявлений:",
          e,
        );
      }
    }
  };

  const filteredCars = cars.filter((car) => {
    if (carFilter === "pending") return !car.verified;
    if (carFilter === "verified") return car.verified;
    return true;
  });

  if (loadingCars || loadingUsers)
    return <div className={scss.loader}>Загрузка...</div>;

  return (
    <div className={scss.adminPage}>
      <div className={scss.adminContainer}>
        {/* Вкладки */}
        <div className={scss.sectionTabs}>
          <button
            className={activeSection === "ads" ? scss.activeSectionTab : ""}
            onClick={() => setActiveSection("ads")}
          >
            🚗 Объявления ({cars.length})
          </button>
          <button
            className={activeSection === "users" ? scss.activeSectionTab : ""}
            onClick={() => setActiveSection("users")}
          >
            👥 Пользователи ({users.length})
          </button>
        </div>

        <hr className={scss.separator} />

        {/* ТАБЛИЦА ОБЪЯВЛЕНИЙ */}
        {activeSection === "ads" && (
          <>
            <div className={scss.filterTabs}>
              <button
                className={carFilter === "all" ? scss.activeTab : ""}
                onClick={() => setCarFilter("all")}
              >
                Все
              </button>
              <button
                className={carFilter === "pending" ? scss.activeTab : ""}
                onClick={() => setCarFilter("pending")}
              >
                Ожидают
              </button>
              <button
                className={carFilter === "verified" ? scss.activeTab : ""}
                onClick={() => setCarFilter("verified")}
              >
                Проверенные
              </button>
            </div>

            <div className={scss.tableWrapper}>
              <table className={scss.adminTable}>
                <thead>
                  <tr>
                    <th>Фото</th>
                    <th>Название</th>
                    <th>Продавец</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map((car) => (
                    <tr key={car.id} className={car.isVip ? scss.vipRow : ""}>
                      <td>
                        <img
                          src={car.images?.[0] || "placeholder.png"}
                          className={scss.carThumb}
                          alt=""
                        />
                      </td>
                      <td>
                        {car.brand} {car.title}
                        <br />
                        <span>
                          {car.price?.toLocaleString()} {car.currency}
                        </span>
                      </td>
                      <td>{car.authorEmail}</td>
                      <td>{car.verified ? "🟢 Проверено" : "🟡 Ожидает"}</td>
                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => handleVerify(car.id, car.verified)}
                          >
                            {car.verified ? "Снять" : "Одобрить"}
                          </button>
                          <button
                            onClick={() => handleToggleVip(car.id, car.isVip)}
                            className={scss.btnVipToggle}
                          >
                            {car.isVip ? "Убрать VIP" : "Дать VIP"}
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car)}
                            className={scss.btnDelete}
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ */}
        {activeSection === "users" && (
          <div className={scss.tableWrapper}>
            <table className={scss.adminTable}>
              <thead>
                <tr>
                  <th>Аватар</th>
                  <th>Email / Имя</th>
                  <th>Роль</th>
                  <th>Тариф (План)</th>
                  <th>Лимит объявлений</th>
                  <th>Доступ к рынку</th>
                  <th>Модерация</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={user.isBanned ? scss.bannedRow : ""}
                  >
                    <td>
                      <img
                        src={user.photo || "placeholder.png"}
                        className={scss.avatarThumb}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                    </td>
                    <td>
                      <strong
                        style={{ color: user.isBanned ? "#e04554" : "inherit" }}
                      >
                        {user.email}
                      </strong>
                      <br />
                      <span>{user.name || "Без имени"}</span>
                    </td>
                    <td>
                      {user.role === "admin" ? "👑 Админ" : "👤 Участник"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleUserPlan(user.id, user.plan)}
                        className={`${scss.tariffBadge} ${user.plan === "vip" ? scss.vipTariff : scss.baseTariff}`}
                      >
                        {user.plan === "vip" ? "👑 VIP План" : "🏷️ Базовый"}
                      </button>
                    </td>
                    <td>
                      <span style={{ fontWeight: "600" }}>
                        {user.adsUsed || 0} / {user.adsLimit || 0}
                      </span>
                    </td>
                    <td>
                      <select
                        value={user.marketStatus || "pending"}
                        onChange={(e) =>
                          handleUpdateMarketStatus(user.id, e.target.value)
                        }
                        className={scss.statusSelect}
                        disabled={user.isBanned}
                      >
                        <option value="active">🟢 Активен (Оплачено)</option>
                        <option value="pending">
                          🟡 Неактивен (Ждет оплаты)
                        </option>
                        <option value="restricted">
                          🔴 Ограничен (Бан на рынке)
                        </option>
                      </select>
                    </td>
                    <td>
                      <div className={scss.actions}>
                        <button
                          onClick={() => handleUpdateRole(user.id, user.role)}
                          className={scss.btnRoleToggle}
                        >
                          Роль
                        </button>
                        <button
                          onClick={() => handleToggleBan(user)}
                          className={
                            user.isBanned ? scss.btnUnban : scss.btnBan
                          }
                        >
                          {user.isBanned ? "Разбан" : "Бан"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
