import { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/FireBase";
import { AuthContext } from "../../context/AuthContext";

export const useUserProfile = () => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setProfile(null);

      setLoading(false);

      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        console.log("exists:", snapshot.exists());
        console.log("data:", snapshot.data());

        if (snapshot.exists()) {
          setProfile({
            id: snapshot.id,
            ...snapshot.data(),
          });
        }

        setLoading(false);
      },
      (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [user]);

  return {
    profile,
    loading,
  };
};
