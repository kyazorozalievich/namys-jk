import React from "react";
import scss from "./LiderAbout.module.scss";
import { FaCrown } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";

const LiderAbout = () => {
  const liderData = [
    {
      name: "Keka",
      desc: "Hellloooo",
      id: "KKA07",
      gosNom: "04 212 KKA",
      profile:
        "https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small/admin-3d-illustration-icon-png.png",
    },
    {
      name: "Abdu",
      desc: "Hellloooo",
      id: "ABDU06",
      gosNom: "1700 BS",
      profile:
        "https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small/admin-3d-illustration-icon-png.png",
    },
    {
      name: "Eljigit",
      desc: "Hellloooo",
      id: "ELII",
      gosNom: "04 888 YVY",
      profile:
        "https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small/admin-3d-illustration-icon-png.png",
    },
  ];
  
  return (
    <section className={scss.liderSec}>
      <div className="container">
        <div className={scss.nav}>
          <h2>
            {" "}
            <span>
              <FaCrown />
            </span>{" "}
            Лидеры
          </h2>
          <div className={scss.lidersBlocks}>
            {liderData.map((el, id) => (
              <div className={scss.liderBlock} id={id}>
                <span>
                  <GiLaurelCrown className={scss.crwn} />
                  LEADER
                </span>
                <img src={el.profile} alt="" />
                <h3>{el.name}</h3>
                <h6>{el.desc}</h6>
                <div className={scss.id}>ID: {el.id}</div>
                <div className={scss.gosNom}>{el.gosNom}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiderAbout;
