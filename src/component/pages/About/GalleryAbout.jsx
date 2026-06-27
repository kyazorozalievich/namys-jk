import React from "react";
import scss from './GalleryAbout.module.scss'
import { GrGallery } from "react-icons/gr";

const GalleryAbout = () => {
  const dataImgs = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgp91qVoHroq_26c75L48xREYi86zBcV2XGdWC1nx-7fw9momRVxDPkWv&s=10",
  ];
  return (
    <section className={scss.gallerySec}>
      <div className="container">
        <div className={scss.nav}>
          <h2>
            <span>

            <GrGallery />
            </span>
            Моменты
          </h2>
          <div className={scss.galleryImgs}>
            {dataImgs.map((el, id) => (
              <img src={el} alt="" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryAbout;
