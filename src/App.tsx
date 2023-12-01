import React, { ReactElement, useEffect } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import Catalogs from "./Pages/Catalogs/Catalogs";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import BasketPage from "./Pages/BasketPage/BasketPage";
import PlacingAnOrderPage from "./Pages/PlacingAnOrderPage/PlacingAnOrderPage";
import OrderPaidPage from "./Pages/OrderPaidPage/OrderPaidPage";
import OrderListPage from "./Pages/OrderListPage/OrderListPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import { GET_BASKET_OF_GOODS, GET_FAVORITE_GOODS, GET_GOODS } from "./store/slice";
import RequireAuth from "./hoc/RequireAuth";
import NotfoundPage from "./Pages/NotfoundPage/NotfoundPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Profile from "./Pages/PfofilePage/ProfilePage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import GoodPage from "./Pages/GoodPage/GoodPage";

function App() {
  const page = useAppSelector((state) => state.page.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_GOODS())
    dispatch(GET_BASKET_OF_GOODS())
    dispatch(GET_FAVORITE_GOODS())
  }, [dispatch])
  interface Elements {
    [key: string]: ReactElement;
  }

  if (page === "COMPLICATED") {
    const ROUTS_ELEMENT: Elements = {
      catalog: <Catalogs />,
      favorites: <FavoritesPage />,
      basket: <BasketPage />,
      good: <GoodPage />,
      profile: <Profile />,
      settings: <SettingsPage />,
      placingAnOrderPage: <PlacingAnOrderPage />,
      orderPaidPage: <OrderPaidPage />,
      orderListPage: <OrderListPage />,
      accountPage: <AccountPage />,
      login: <LoginPage />,
    };
    return (
      <Routes>
        <Route path={"/"} element={<MainPage />}>
          <Route key={Math.random().toString(36)} path={"/"} element={<Catalogs />} />
          {Object.keys(ROUTS_ELEMENT).map((route) => {
            const key = Math.random().toString(36);  
            if (route === "orderPaidPage") {
              return (<Route key={key} path={route} element={
                <RequireAuth>
                  {ROUTS_ELEMENT[route]} 
                </RequireAuth>
              }/>) 
            } if (route === "good") {
              return (<Route key={key} path={"good/:id"} element={<GoodPage />}/>) 
            }   
            return <Route key={key} path={route} element={ROUTS_ELEMENT[route]} />;
          })}
        </Route>
        <Route path="*" element={<NotfoundPage />} />
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
