import React from "react";
import scss from "./Uslugi.module.scss";
import { BsStars } from "react-icons/bs";
import nomer from "../../../data/images/uslugi/nomer.png";
import gg from "../../../data/images/uslugi/gg.png";
import shildik from "../../../data/images/uslugi/shildik.png";
import prodaja from "../../../data/images/uslugi/prodaja.png";
import logotip from "../../../data/images/uslugi/logotip.png";
import mobi from "../../../data/images/uslugi/mobi.png";

const Uslugi = () => {
  const uslugData = [
    {
      title: "Изготовление гос номеров",
      img: nomer,
    },
    {
      title: "Всем известные GG услуги",
      img: gg,
    },
    {
      title: "Шильдики и таблички на любую машину",
      img: shildik,
    },
    {
      title: "Продажа авто и аккаунтов",
      img: prodaja,
    },
    {
      title: "Логотипы и брендинг кланов",
      img: logotip,
    },
    {
      title: "Фото- и видеомонтажи тачек",
      img: mobi,
    },
  ];
  return (
    <section className={scss.uslugSec}>
      <div className="container">
        <div className={scss.nav}>
          <h2>
            <span>
              <BsStars />
            </span>
            Наши Услуги
          </h2>
          <div className={scss.usBlocks}>
            {
                uslugData.map((el) => (
                    <div className={scss.usCard}>
                        <img src={el.img} alt="" />
                        <h3>{el.title}</h3>
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Uslugi;
