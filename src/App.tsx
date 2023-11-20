import React, { ReactElement, useEffect } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import Catalogs from "./Pages/Catalogs/Catalogs";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import BasketPage from "./Pages/BasketPage/BasketPage";
import Profile from "./components/Pfofile/Profile";
import PlacingAnOrderPage from "./Pages/PlacingAnOrderPage/PlacingAnOrderPage";
import OrderPaidPage from "./Pages/OrderPaidPage/OrderPaidPage";
import OrderListPage from "./Pages/OrderListPage/OrderListPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import { GET_GOODS } from "./store/slice";

function App() {
  const page = useAppSelector((state) => state.page.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_GOODS())
  }, []);
  interface Elements {
    [key: string]: ReactElement;
  }

  if (page === "COMPLICATED") {
    const ROUTS_ELEMENT: Elements = {
      catalog: <Catalogs />,
      favorites: <FavoritesPage />,
      basket: <BasketPage />,
      profile: <Profile />,
      placingAnOrderPage: <PlacingAnOrderPage />,
      orderPaidPage: <OrderPaidPage />,
      orderListPage: <OrderListPage />,
      accountPage: <AccountPage />,
    };
    return (
      <Routes>
        <Route path={"/"} element={<MainPage />}>
          <Route key={Math.random().toString(36)} path={"/"} element={<Catalogs />} />
          {Object.keys(ROUTS_ELEMENT).map((route) => {
            const key = Math.random().toString(36);
            return <Route key={key} path={route} element={ROUTS_ELEMENT[route]} />;
          })}
        </Route>
      </Routes>
    );
  }
  if (page === "LOADING") {
    return <LoadingPage />;
  }
  return (
    <Routes>
      <Route key={Math.random().toString(36)} path={"/"} element={<Catalogs />} />;
    </Routes>
  )
}

export default App;
