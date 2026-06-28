import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/FireBase"; // Обязательно импортируй db (Firestore)
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      console.log("FIREBASE USER:", currentUser);

      if (currentUser) {
        try {
          // Ссылка на документ пользователя в коллекции "users" по его уникальному uid
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          // Если документа в Firestore нет, создаем его автоматически
          if (!userSnap.exists()) {
            console.log("Новый пользователь! Создаем документ в Firestore...");
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || "Участник клана",
              photoURL: currentUser.photoURL || "",
              role: "member", // По умолчанию обычный участник
              isVip: false, // По умолчанию не VIP
              isBanned: false, // По умолчанию не забанен
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error(
            "Ошибка при проверке/создании пользователя в Firestore:",
            error,
          );
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
