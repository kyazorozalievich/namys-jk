import React from "react";
import scss from "./Stats.module.scss";
import { FaUsers } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { HiMiniShoppingCart } from "react-icons/hi2";

const Stats = () => {
  return (
    <section className={scss.statsSec}>
      <div className="container">
        <div className={scss.nav}>
          <div className={scss.block}>
            <span>
              <FaUsers />
            </span>
            <h2>Сообщество</h2>
            <h6>15+ преданных участников, лидеры и братство</h6>
          </div>
          <div className={scss.block}>
            <span>
              <IoCarSportSharp />
            </span>
            <h2>Услуги</h2>
            <h6>Номера, шильдики, тюнинг от GG-мастеров</h6>
          </div>
          <div className={scss.block}>
            <span>
              <HiMiniShoppingCart />
            </span>
            <h2>Маркет</h2>
            <h6>Продажа авто и аккаунтов с модерацией</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
