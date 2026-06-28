import React from "react";
import scss from "./CarCard.module.scss";
import { MdVerified } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";

const CarCard = ({ car, onOpenModal }) => {
  // Проверяем наличие фото, берем первую или заглушку
  const mainImage =
    car.images && car.images.length > 0
      ? car.images[0]
      : "https://via.placeholder.com/240x160?text=No+Photo";

  const isAdmin = car.authorRole === "admin";
  const isVip = car.isVip;

  // Определяем класс стиля для карточки в зависимости от приоритета (Admin > VIP > Ordinary)
  const cardStatusClass = isAdmin 
    ? scss.adminCard 
    : isVip 
      ? scss.vipCard 
      : "";

  return (
    <div className={`${scss.card} ${cardStatusClass}`}>
      <div className={scss.cardImg}>
        <img src={mainImage} alt={car.title} />

        {/* Иконка "Проверено" в верхнем левом углу */}
        {car.verified && (
          <div className={scss.verifiedIcon} title="Проверено администрацией">
            <MdVerified />
          </div>
        )}

        {/* Корона в верхнем правом углу (только если VIP и НЕ админ) */}
        {isVip && !isAdmin && (
          <div className={scss.crownIcon} title="VIP Объявление">
            <RiVipCrownFill />
          </div>
        )}

        {/* Бэйджи статусов внизу фотографии */}
        <div className={scss.badges}>
          {isAdmin ? (
            <span className={scss.adminBadge}>КЛАН LDR</span>
          ) : null}
        </div>
      </div>

      <div className={scss.cardInfo}>
        <div className={scss.cardHeader}>
          <div>
            <h3>{car.title}</h3>
            {/* Тип кузова аккуратно перенесен под название */}
            <span className={scss.type}>{car.carType || "Седан"}</span>
          </div>
          {car.brand && <span className={scss.brand}>{car.brand}</span>}
        </div>

        <p className={scss.description}>
          {car.description
            ? `${car.description.slice(0, 40)}...`
            : "Нет описания"}
        </p>

        <div className={scss.bottom}>
          <h2>
            <span>Цена:</span> {car.price}{" "}
            {car.currency === "₽ Рубли" || car.currency === "Hex Рубли"
              ? " ₽"
              : car.currency === "Gold"
                ? " Gold"
                : " $"}
          </h2>

          <button onClick={() => onOpenModal(car)}>Посмотреть</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;