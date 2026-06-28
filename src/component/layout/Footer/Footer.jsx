import React from "react";
import scss from "./Footer.module.scss";
import fullogo from "../../../data/images/fullogo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={scss.nav}>
          <div className={scss.mainDatas}>
            <div className={scss.logoBlock}>
              <img src={fullogo} alt="" />
              <h6>
                Клан <span>Namys JK</span> - Car Parking Multiplayer -
                Кыргызстан
              </h6>
            </div>
            <div className={scss.navigationBlock}>
              <h3>Навигация</h3>
              <NavLink to="/">Главная</NavLink>
              <NavLink to="/about">О Клане</NavLink>
              <NavLink to="/detailing">Мастерская</NavLink>
              <NavLink to="/shop">Авторынок</NavLink>
            </div>
            <div className={scss.contactBlock}>
              <h3>Контакты</h3>
              <NavLink>
                Telegram: <span>@kka_07</span>{" "}
              </NavLink>
              <NavLink>
                Tik Tok: <span>@kka.212</span>
              </NavLink>
              <NavLink>
                Instagram: <span>@namys_jk</span>
              </NavLink>
            </div>
          </div>
          <p>© 2026 NAMYS JK · Mental RPM → Mental Gang → Namys JK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
