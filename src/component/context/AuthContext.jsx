import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/FireBase"; // Обязательно импортируй db (Firestore)
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Код внутри useEffect в AuthContext
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            console.log("Создаем пользователя с правильной структурой...");
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || "Участник клана",
              photo: currentUser.photoURL || "", // Твой ключ photo
              role: "member",
              marketStatus: "pending", // 🟢 СРАЗУ НЕАКТИВЕН (На проверке/Ждет оплаты)
              plan: "free", // 🟢 Стартовый тариф обычный
              adsLimit: 3, // 🟢 Сколько объявлений можно (например, 3)
              adsUsed: 0, // 🟢 Уже использовано
              isBanned: false, // Флаг для бана мошенников
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Ошибка Firestore:", error);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
