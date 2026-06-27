import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZFfd37n3pg4Id-H65HKiBbey3u3igdAY",
  authDomain: "namys-jk.firebaseapp.com",
  projectId: "namys-jk",
  storageBucket: "namys-jk.firebasestorage.app",
  messagingSenderId: "1099371901425",
  appId: "1:1099371901425:web:32f022a572484a71b61450",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;