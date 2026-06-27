import React from "react";
import scss from "./ShopMain.module.scss";
import { GiCarWheel } from "react-icons/gi";
import auto from "../../../data/images/shop/autosalon.png";
import account from "../../../data/images/shop/account.png";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ShopMain = () => {
  const navigate = useNavigate()
  return (
    <section className={scss.shopSec}>
      <div className={scss.bg}>
        <div className="container">
          <div className={scss.nav}>
            <h1>
              <span>
                <GiCarWheel />
              </span>
              Рынок клана
            </h1>
            <h2>Продажа и покупка машин / аккаунтов</h2>

            <div className={scss.blocks}>
              <div onClick={() => navigate("/shop/car")}>
                <img src={auto} alt="" />
                <button onClick={() => navigate("/shop/car")}>
                  Перейти <FaAngleRight />
                </button>
              </div>
              <div onClick={() => navigate("/shop/account")}>
                <img src={account} alt="" />
                <button onClick={() => navigate("/shop/account")}>
                  Перейти <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopMain;
