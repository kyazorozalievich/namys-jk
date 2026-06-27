import { useState } from "react";
import { ModalContext } from "./ModalContext";
import MarketAccessModal from "./MarketAccessModal";
import { useNavigate } from "react-router-dom";

const ModalProvider = ({ children }) => {
  const [marketModal, setMarketModal] = useState(false);

  const navigate = useNavigate();

  const checkMarketAccess = (profile) => {
    if (!profile) return;

    if (profile.marketStatus !== "active") {
      openMarketModal();
      return;
    }

    if (profile.adsUsed >= profile.adsLimit) {
      alert("Все места заняты. Удалите одно объявление.");
      return;
    }

    navigate("/profile/create");
  };
  const openMarketModal = () => {
    setMarketModal(true);
  };

  const closeMarketModal = () => {
    setMarketModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openMarketModal,
        closeMarketModal,
        checkMarketAccess,
      }}
    >
      {children}

      <MarketAccessModal open={marketModal} onClose={closeMarketModal} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
