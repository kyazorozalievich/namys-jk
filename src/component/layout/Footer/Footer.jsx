import React from "react";
import scss from "./Footer.module.scss";
import fullogo from "../../../data/images/fullogo.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
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
              <Link to='/'>Главная</Link>
              <Link to='/about'>О Клане</Link>
              <Link to='/detailing'>Мастерская</Link>
              <Link to='/'>Авторынок</Link>
            </div>
            <div className={scss.contactBlock}>
              <h3>Контакты</h3>
              <Link>
                Telegram: <span>@kka_07</span>{" "}
              </Link>
              <Link>
                Tik Tok: <span>@kka.212</span>
              </Link>
              <Link>
                Instagram: <span>@namys_jk</span>
              </Link>
            </div>
          </div>
          <p>© 2026 NAMYS JK · Mental RPM → Mental Gang → Namys JK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
