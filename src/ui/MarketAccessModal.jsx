import React from "react";
import scss from "./MarketAccessModal.module.scss";

const MarketAccessModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className={scss.overlay} onClick={onClose}>
      <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
        <button className={scss.close} onClick={onClose}>
          ✕
        </button>

        <h1>
          Авторынок
          <span> Namys JK</span>
        </h1>

        <p className={scss.description}>
          Для публикации автомобилей необходимо получить доступ к авторынку.
        </p>

        <div className={scss.line}></div>

        <div className={scss.tarif}>
          <div className={scss.block}>
            <h3>🔑 Обычный доступ</h3>

            <ul>
              <li>✔ До 10 активных объявлений</li>
              <li>✔ Размещение автомобилей</li>
              <li>✔ Просмотр покупателей</li>
              <li>✔ Поддержка администрации</li>
            </ul>
          </div>

          <div className={scss.vip}>
            <div className={scss.vipTitle}>⭐ VIP доступ</div>

            <ul>
              <li>✔ До 20 объявлений</li>
              <li>✔ VIP карточка автомобиля</li>
              <li>✔ Золотая рамка</li>
              <li>✔ Выше обычных объявлений</li>
            </ul>
          </div>
        </div>

        <button
          className={scss.adminBtn}
          onClick={() => window.open("https://t.me/kka_07")}
        >
          💬 Получить доступ у администратора
        </button>

        <small>Доступ выдается администрацией Namys JK</small>
      </div>
    </div>
  );
};

export default MarketAccessModal;
