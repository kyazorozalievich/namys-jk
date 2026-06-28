import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Hedaer from "./component/layout/Header/Hedaer";
import MainPage from "./component/pages/Main/MainPage";
import AboutPage from "./component/pages/About/AboutPage";
import DetailingPage from "./component/pages/Detailing/DetailingPage";
import ShopPage from "./component/pages/Shopping/ShopPage";
import ShopCars from "./component/pages/Shopping/ShopCars";
import Create from "./component/pages/Shopping/Create";
import ProfileMenu from "./component/layout/Profile/ProfileMenu";
import AdminRoute from "./component/admin/AdminRoute";
import AdminPage from "./component/admin/AdminPage";

function App() {
  const data = [
    { id: 1, path: "/", page: <MainPage /> },
    { id: 2, path: "/about", page: <AboutPage /> },
    { id: 3, path: "/shop", page: <ShopPage /> },
    { id: 4, path: "/detailing", page: <DetailingPage /> },
    { id: 5, path: "/shop/car", page: <ShopCars /> },
    { id: 6, path: "/profile/account", page: <ProfileMenu /> },
    { id: 7, path: "/profile/create", page: <Create /> },
    { id: 8, path: "/profile/userCars", page: <Create /> },
  ];

  return (
    <div className="app">
      <Hedaer />
      <div className="mainContent">
        <Routes>
          {data.map((el) => (
            <Route key={el.id} path={el.path} element={el.page} />
          ))}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
