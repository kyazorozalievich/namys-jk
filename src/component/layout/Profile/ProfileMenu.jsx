import React, { useContext } from "react";
import scss from "./ProfileMenu.module.scss";
import { useUserProfile } from "./useUserProfile";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../ui/ModalContext";

const ProfileMenu = () => {
  const { profile, loading } = useUserProfile();
  const { checkMarketAccess } = useContext(ModalContext);
  const navigate = useNavigate();

  if (loading) {
    return <h2 className={scss.errorAuth}>Загрузка...</h2>;
  }

  if (!profile) {
    return <h2 className={scss.errorAuth}>Профиль не найден</h2>;
  }

  // Настройка лимитов на основе общего поля plan
  const adsLimit = profile.plan === "vip" ? 20 : 10;
  const adsUsed = profile.adsUsed || 0;

  return (
    <section className={scss.profilePage}>
      <div className="container">
        <div className={scss.card}>
          <div className={scss.top}>
            <img src={profile.photo} alt={profile.name} />

            <div className={scss.userInfo}>
              <h1>{profile.name}</h1>

              <span
                className={
                  profile.plan === "vip" ? scss.vipBadge : scss.freeBadge
                }
              >
                {profile.plan === "vip"
                  ? "⭐ VIP Пользователь"
                  : "👤 Обычный пользователь"}
              </span>
            </div>
          </div>

          <div className={scss.stats}>
            <div className={scss.item}>
              <span>Роль</span>
              <h3>{profile.role || "member"}</h3>
            </div>

            <div className={scss.item}>
              <span>Доступ к рынку</span>
              <h3>
                {profile.marketStatus === "active"
                  ? "✅ Активен"
                  : profile.marketStatus === "blocked"
                    ? "🚫 Заблокирован"
                    : "❌ Нет доступа"}
              </h3>
            </div>

            <div className={scss.item}>
              <span>Тариф</span>
              <h3>{profile.plan === "vip" ? "VIP" : "Free"}</h3>
            </div>

            <div className={scss.item}>
              <span>Объявления</span>
              <h3>
                {adsUsed}/{adsLimit}
              </h3>
            </div>
          </div>

          <div className={scss.progress}>
            <div
              style={{
                width: `${Math.min((adsUsed / adsLimit) * 100, 100)}%`,
              }}
            ></div>
          </div>

          <p className={scss.bottomText}>
            Свободно мест: <b>{Math.max(adsLimit - adsUsed, 0)}</b>
          </p>

          <div className={scss.actions}>
            <button
              className={scss.myAds}
              onClick={() => navigate("/profile/userCars")}
            >
              🚗 Мои объявления
            </button>

            <button
              className={scss.addCar}
              onClick={() => checkMarketAccess(profile)}
            >
              ➕ Разместить автомобиль
            </button>
          </div>

          <div className={scss.marketInfo}>
            <h2>Авторынок Namys JK</h2>

            {profile.marketStatus === "active" ? (
              <>
                <p>✅ У вас есть доступ к публикации автомобилей.</p>
                <p>
                  Вы можете разместить еще{" "}
                  <b>{Math.max(adsLimit - adsUsed, 0)}</b> объявлений.
                </p>
              </>
            ) : (
              <>
                <p>🔒 Доступ к публикации автомобилей отсутствует.</p>
                <p>Для получения доступа обратитесь к администрации клана.</p>

                <button
                  className={scss.telegram}
                  onClick={() => window.open("https://t.me/kka_07")}
                >
                  💬 Связаться с администрацией
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileMenu;
