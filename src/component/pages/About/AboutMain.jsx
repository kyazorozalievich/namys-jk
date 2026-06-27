import React from "react";
import scss from "./AboutMain.module.scss";

const AboutMain = () => {
  return (
    <section className={scss.mainSec}>
      <div className={scss.bg}>
        <div className="container">
          <div className={scss.nav}>
            <h1>
              Namys <span>JK</span>
            </h1>
            <h6>
              Добро пожаловать в наш мир <br /> Тут ты подробнее познокомишся с
              нашим кланом
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMain;
