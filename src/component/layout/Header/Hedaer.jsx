import React, { useContext, useState } from "react";
import scss from "./Header.module.scss";
import logo from "../../../data/images/fullogo.png";

import {useLocation, useNavigate } from "react-router-dom";

import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../../../firebase/FireBase";

import { AuthContext } from "../../context/AuthContext";
import { GoHomeFill } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { BsTools } from "react-icons/bs";
import { GiCartwheel } from "react-icons/gi";
import { ModalContext } from "../../../ui/ModalContext";
import { useUserProfile } from "../Profile/useUserProfile";

const Header = () => {
  const location = useLocation();
  const { checkMarketAccess } = useContext(ModalContext);
  const navigate = useNavigate();
  const { profile } = useUserProfile();

  const { user } = useContext(AuthContext);
  console.log("HEADER:", user);

  const [openProfile, setOpenProfile] = useState(false);

  // const loginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);

  //     // alert(`Добро пожаловать, ${result.user.displayName}!`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logout = async () => {
    await signOut(auth);

    setOpenProfile(false);
  };

  return (
    <header>
      <div className="container">
        <div className={scss.nav}>
          <img src={logo} alt="logo" />

          <div className={scss.pages}>
            <NavLink
              to="/"
              className={location.pathname === "/" ? scss.main : ""}
            >
              <GoHomeFill />
              Главная
            </NavLink>

            <NavLink
              to="/about"
              className={location.pathname === "/about" ? scss.main : ""}
            >
              <RiTeamFill />О Клане
            </NavLink>

            <NavLink
              to="/detailing"
              className={location.pathname === "/detailing" ? scss.main : ""}
            >
              <BsTools />
              Мастерская
            </NavLink>

            <NavLink
              to="/shop"
              className={location.pathname === "/shop" ? scss.main : ""}
            >
              <GiCartwheel />
              Авторынок
            </NavLink>
          </div>

          <div className={scss.icons}>
            <MdAdminPanelSettings className={scss.admin} />

            {user ? (
              <div
                className={scss.profile}
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img className={scss.avatar} src={user.photoURL} alt="" />

                <div className={scss.info}>
                  <h4>{user.displayName}</h4>

                  <p>Онлайн</p>
                </div>

                {openProfile && (
                  <div className={scss.dropdown}>
                    <span onClick={() => naviagete("/profile/account")}>
                      Мой профиль
                    </span>

                    <span onClick={() => checkMarketAccess(profile)}>
                      Разместить машину
                    </span>

                    <button onClick={logout}>Выйти</button>
                  </div>
                )}
              </div>
            ) : (
              <button className={scss.login} onClick={loginWithGoogle}>
                <FaUser />

                <span>Войти</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
