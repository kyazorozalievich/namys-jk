import React from "react";
import { Navigate } from "react-router-dom";
import { useUserProfile } from "../layout/Profile/useUserProfile"; // Путь к твоему хуку профиля

const AdminRoute = ({ children }) => {
  // Берем данные профиля и стейт загрузки из Firestore
  const { profile, loading } = useUserProfile();

  // Ждем, пока загрузятся данные из Firestore, чтобы не выкинуло раньше времени
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#ffb800" }}>
        Проверка прав доступа...
      </div>
    );
  }

  // Проверяем роль именно из Firestore документа профиля
  if (!profile || profile.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Если всё ок и ты админ — показываем админку
  return <>{children}</>;
};

export default AdminRoute;
