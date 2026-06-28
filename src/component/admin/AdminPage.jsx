import React, { useEffect, useState } from "react";
import { db } from "../../firebase/FireBase"; // Твой конфиг Firebase
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import scss from "./AdminPage.module.scss";

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Главные вкладки админки: "ads" (Объявления) или "users" (Пользователи)
  const [activeSection, setActiveSection] = useState("ads");

  // Фильтр внутри объявлений ("all", "pending", "verified")
  const [carFilter, setCarFilter] = useState("all");

  // 1. Подписка на машины (в реальном времени)
  useEffect(() => {
    const qCars = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    const unsubscribeCars = onSnapshot(qCars, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => {
        carsData.push({ id: doc.id, ...doc.data() });
      });
      setCars(carsData);
      setLoadingCars(false);
    });

    return () => unsubscribeCars();
  }, []);

  // 2. Подписка на пользователей (в реальном времени)
  useEffect(() => {
    const qUsers = query(collection(db, "users")); // Предполагаем, что коллекция называется "users"
    const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);
      setLoadingUsers(false);
    });

    return () => unsubscribeUsers();
  }, []);

  /* ================= ФУНКЦИИ ДЛЯ ОБЪЯВЛЕНИЙ ================= */

  // Одобрение / снятие верификации
  const handleVerify = async (carId, currentStatus) => {
    try {
      const carRef = doc(db, "cars", carId);
      await updateDoc(carRef, { verified: !currentStatus });
    } catch (error) {
      console.error("Ошибка при обновлении статуса верификации:", error);
    }
  };

  // Переключение VIP-статуса для конкретной машины
  const handleToggleVip = async (carId, currentVipStatus) => {
    try {
      const carRef = doc(db, "cars", carId);
      await updateDoc(carRef, { isVip: !currentVipStatus });
    } catch (error) {
      console.error("Ошибка при обновлении VIP-статуса машины:", error);
    }
  };

  // Удаление любого объявления
  const handleDeleteCar = async (carId) => {
    if (
      window.confirm(
        "Вы уверены, что хотите безвозвратно удалить это объявление?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "cars", carId));
      } catch (error) {
        console.error("Ошибка при удалении машины:", error);
      }
    }
  };

  /* ================= ФУНКЦИИ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ ================= */

  // Изменение роли пользователя (Участник <-> Админ)
  const handleUpdateRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "member" : "admin";
    if (
      window.confirm(
        `Изменить роль пользователя на ${newRole === "admin" ? "Администратор" : "Участник"}?`,
      )
    ) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { role: newRole });
      } catch (error) {
        console.error("Ошибка при изменении роли:", error);
      }
    }
  };

  // Блокировка / Разблокировка пользователя (Бан мошенников)
  const handleToggleBan = async (userId, currentBanStatus) => {
    const actionText = currentBanStatus ? "разблокировать" : "ЗАБЛОКИРОВАТЬ";
    if (
      window.confirm(`Вы уверены, что хотите ${actionText} этого пользователя?`)
    ) {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isBanned: !currentBanStatus });

        // Дополнительно: здесь можно запустить логику удаления всех машин забаненного, если нужно
      } catch (error) {
        console.error("Ошибка при изменении статуса блокировки:", error);
      }
    }
  };

  // Фильтрация машин для рендера
  const filteredCars = cars.filter((car) => {
    if (carFilter === "pending") return !car.verified;
    if (carFilter === "verified") return car.verified;
    return true;
  });

  if (loadingCars || loadingUsers) {
    return (
      <div className={scss.loader}>
        Загрузка расширенной панели управления...
      </div>
    );
  }

  return (
    <div className={scss.adminPage}>
      <div className={scss.adminContainer}>

        {/* Глобальные переключатели разделов админки */}
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

        {/* РАЗДЕЛ 1: УПРАВЛЕНИЕ ОБЪЯВЛЕНИЯМИ */}
        {activeSection === "ads" && (
          <>
            {/* Внутренние фильтры машин */}
            <div className={scss.filterTabs}>
              <button
                className={carFilter === "all" ? scss.activeTab : ""}
                onClick={() => setCarFilter("all")}
              >
                Все ({cars.length})
              </button>
              <button
                className={carFilter === "pending" ? scss.activeTab : ""}
                onClick={() => setCarFilter("pending")}
              >
                Ожидают модерации ({cars.filter((c) => !c.verified).length})
              </button>
              <button
                className={carFilter === "verified" ? scss.activeTab : ""}
                onClick={() => setCarFilter("verified")}
              >
                Проверенные ({cars.filter((c) => c.verified).length})
              </button>
            </div>

            {/* Таблица машин */}
            <div className={scss.tableWrapper}>
              <table className={scss.adminTable}>
                <thead>
                  <tr>
                    <th>Фото</th>
                    <th>Название / Цена</th>
                    <th>Продавец</th>
                    <th>Характеристики</th>
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
                          alt={car.title}
                          className={scss.carThumb}
                        />
                      </td>
                      <td>
                        <div className={scss.carInfo}>
                          <strong>
                            {car.brand} {car.title}
                          </strong>
                          <span>
                            {car.price?.toLocaleString()} {car.currency}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={scss.authorInfo}>
                          <span>{car.authorEmail}</span>
                          <span
                            className={`${scss.roleBadge} ${scss[car.authorRole]}`}
                          >
                            {car.authorRole === "admin" ? "Админ" : "Участник"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={scss.specs}>
                          <span>🚀 {car.power} HP</span>
                          {car.isVip && (
                            <span className={scss.vipCrown}>👑 VIP Авто</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`${scss.statusBadge} ${car.verified ? scss.verified : scss.pending}`}
                        >
                          {car.verified ? "Проверено" : "Ожидает"}
                        </span>
                      </td>
                      <td>
                        <div className={scss.actions}>
                          <button
                            onClick={() => handleVerify(car.id, car.verified)}
                            className={
                              car.verified ? scss.btnUnverify : scss.btnVerify
                            }
                          >
                            {car.verified ? "Снять проверку" : "Одобрить"}
                          </button>

                          <button
                            onClick={() => handleToggleVip(car.id, car.isVip)}
                            className={scss.btnVipToggle}
                          >
                            {car.isVip ? "Убрать VIP" : "Дать VIP"}
                          </button>

                          <button
                            onClick={() => handleDeleteCar(car.id)}
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
              {filteredCars.length === 0 && (
                <div className={scss.emptyState}>
                  Нет объявлений в этой категории
                </div>
              )}
            </div>
          </>
        )}

        {/* РАЗДЕЛ 2: УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ (БАН / ПРАВА) */}
        {activeSection === "users" && (
          <div className={scss.tableWrapper}>
            <table className={scss.adminTable}>
              <thead>
                <tr>
                  <th>Email пользователя</th>
                  <th>Имя / Никнейм</th>
                  <th>Текущий статус / Роль</th>
                  <th>Состояние счета / Активность</th>
                  <th>Управление правами и баны</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={user.isBanned ? scss.bannedRow : ""}
                  >
                    <td>
                      <strong
                        style={{ color: user.isBanned ? "#e04554" : "inherit" }}
                      >
                        {user.email} {user.isBanned && "(ЗАБАНЕН)"}
                      </strong>
                    </td>
                    <td>{user.name || user.displayName || "Не указано"}</td>
                    <td>
                      <span
                        className={`${scss.roleBadge} ${scss[user.role || "member"]}`}
                      >
                        {user.role === "admin" ? "Администратор" : "Участник"}
                      </span>
                    </td>
                    <td>
                      {user.isVip ? (
                        <span className={scss.vipCrown}>👑 VIP Аккаунт</span>
                      ) : (
                        "Обычный"
                      )}
                    </td>
                    <td>
                      <div className={scss.actions}>
                        <button
                          onClick={() => handleUpdateRole(user.id, user.role)}
                          className={scss.btnRoleToggle}
                        >
                          {user.role === "admin"
                            ? "Сделать участником"
                            : "Дать права админа"}
                        </button>

                        <button
                          onClick={() =>
                            handleToggleBan(user.id, user.isBanned)
                          }
                          className={
                            user.isBanned ? scss.btnUnban : scss.btnBan
                          }
                        >
                          {user.isBanned
                            ? "Разблокировать"
                            : "Забанить (Мошенник)"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div className={scss.emptyState}>Список пользователей пуст</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
