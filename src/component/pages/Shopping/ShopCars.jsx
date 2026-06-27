import React, { useContext, useState } from "react";
import scss from "./ShopCars.module.scss";
import { BiSolidWinkSmile } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../ui/ModalContext";
import { useUserProfile } from "../../layout/Profile/useUserProfile";

const ShopCars = () => {
  const { checkMarketAccess } = useContext(ModalContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const { profile } = useUserProfile();

  const [photoIndex, setPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const carsData = [
    {
      type: "legk",
      price: 200,
      valute: "rubl",
      name: "BMW",

      img: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      ],

      contact: {
        app: "whatsapp",
        link: "0707592828",
      },

      description:
        "BMW из игры Car Parking Multiplayer. Красивый тюнинг, быстрый автомобиль.",
      power: "300hp",
    },
  ];

  const openModal = (car) => {
    setSelectedCar(car);

    setPhotoIndex(0);
  };

  const nextPhoto = () => {
    setPhotoIndex((prev) =>
      prev === selectedCar.img.length - 1 ? 0 : prev + 1,
    );
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) =>
      prev === 0 ? selectedCar.img.length - 1 : prev - 1,
    );
  };

  return (
    <section className={scss.carsSec}>
      <div className="container">
        <div className={scss.nav}>
          <h2>
            Авто в твоем вкусе
            <span>
              <BiSolidWinkSmile />
            </span>
          </h2>

          <div className={scss.mainBtns}>
            <div className={scss.tables}>
              <select>
                <option>Тип</option>
                <option>Легковой</option>
                <option>Грузовой</option>
              </select>

              <select>
                <option>Цена</option>
                <option>Дорогие</option>
                <option>Дешевые</option>
              </select>
            </div>
            <button onClick={() => checkMarketAccess(profile)}>
              Опубликовать машину +
            </button>
          </div>

          <div className={scss.carsCards}>
            {carsData.map((el, index) => (
              <div className={scss.card} key={index}>
                <div className={scss.cardImg}>
                  <img src={el.img[0]} alt={el.name} />

                  <span className={scss.type}>
                    {el.type === "legk"
                      ? "Легковой"
                      : el.type === "gruz"
                        ? "Грузовой"
                        : "Внедорожник"}
                  </span>
                </div>

                <div className={scss.cardInfo}>
                  <h3>{el.name}</h3>

                  <p className={scss.description}>
                    {el.description.slice(0, 40)}...
                  </p>

                  <div className={scss.bottom}>
                    <h2>
                      <span>Цена:</span>
                      {el.price}

                      {el.valute === "rubl" ? " ₽" : "$"}
                    </h2>

                    <button onClick={() => openModal(el)}>Посмотреть</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCar && (
        <div className={scss.modalBg} onClick={() => setSelectedCar(null)}>
          <div className={scss.modal} onClick={(e) => e.stopPropagation()}>
            <span className={scss.close} onClick={() => setSelectedCar(null)}>
              <IoCloseSharp />
            </span>
            <div className={scss.modalImg}>
              <button onClick={prevPhoto}>
                <FaArrowLeft />
              </button>

              <img src={selectedCar.img[photoIndex]} alt="" />

              <button onClick={nextPhoto}>
                <FaArrowRight />
              </button>
            </div>

            <h2>{selectedCar.name}</h2>

            <p>{selectedCar.description}</p>

            <div className={scss.detail}>
              <h4>
                Цена:
                <span>
                  {" "}
                  {selectedCar.price}
                  {selectedCar.valute === "rubl" ? " ₽" : "$"}
                </span>
              </h4>
              <h4>
                Сила: <span>{selectedCar.power}</span>
              </h4>
            </div>

            <div className={scss.buy} onClick={() => setSelectedCar(null)}>
              Закрыть
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopCars;
