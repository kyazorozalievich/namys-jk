import React from "react";
import scss from "./Main.module.scss";
import { IoLocation } from "react-icons/io5";
import logo from "../../../data/images/logo.png";
import { FaChevronRight } from "react-icons/fa";

const Main = () => {
  return (
    <section className={scss.mainSec}>
      <div className={scss.bg}>
        <div className="container">
          <div className={scss.nav}>
            <div className={scss.text}>
              <h5>
                <IoLocation />
                Кыргызстан · Car Parking Multiplayer
              </h5>
              <h1>
                <span>Namys</span> <br /> JK Clan
              </h1>
              <h6>
                Большая история, большие успехи <br />
                приветствуем всех кто пришел в наш мир
              </h6>
              <div className={scss.buttons}>
                <button className={scss.btn1}>
                  О Клане <FaChevronRight />
                </button>
                <button className={scss.btn2}>Отдел продаж</button>
              </div>
            </div>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
