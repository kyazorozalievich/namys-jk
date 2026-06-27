import React from "react";
import scss from "./MembersAbout.module.scss";
import { FaUsers } from "react-icons/fa";

const MembersAbout = () => {
  const membersData = [
    {
      nickname: "Borz",
      name: "Ariet",
      gosNom: "04 777 NOM",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Suli",
      name: "Suli",
      gosNom: "07 070 TYR",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Opium",
      name: "Rashid",
      gosNom: "07 007 KRT",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Kake",
      name: "Kalys",
      gosNom: "07 444 DDS",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },

    {
      nickname: "Nurchik",
      name: "Nurel",
      gosNom: "09 099 BEX",
      gameId: "KGZ",
      rating: "Officer",
      status: "active",
    },
    {
      nickname: "Nurjigitk",
      name: "Nurjigit",
      gosNom: "07 777 FBI",
      gameId: "KGZ",
      rating: "Officer",
      status: "active",
    },
    {
      nickname: "Kuzya",
      name: "Kuzya",
      gosNom: "T 7077 T",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "UMR05",
      name: "Umar",
      gosNom: "05 055 UMR",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Dior",
      name: "Bayaman",
      gosNom: "01 777 BZR",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Stena_05",
      name: "Dastan",
      gosNom: "05 013 CPY",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
    {
      nickname: "Amanio",
      name: "Aman",
      gosNom: "04 034 AON",
      gameId: "KGZ",
      rating: "Member",
      status: "active",
    },
  ];

  return (
    <section className={scss.memberSec}>
      <div className="container">
        <div className={scss.nav}>
          <h2>
            <span>
              <FaUsers />
            </span>
            Участники ({membersData.length})
          </h2>
          <div className={scss.membersTable}>
            {membersData
              .sort((a, b) => {
                if (a.rating === "Officer" && b.rating !== "Officer") return -1;
                if (a.rating !== "Officer" && b.rating === "Officer") return 1;
                return 0;
              })
              .map((el) => (
                <div
                  key={el.id}
                  className={el.rating === "Officer" ? scss.off : scss.mem}
                >
                  <img
                    src="https://img.magnific.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80"
                    alt=""
                  />
                  <div className={scss.text}>
                    <h2>
                      {el.nickname} <span>{el.rating}</span>
                    </h2>
                    <h6>{el.name}</h6>
                    <h4>{el.gosNom}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersAbout;
