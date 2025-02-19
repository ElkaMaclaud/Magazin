import React, { ReactElement, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MagazinPage from "./Pages/MagazinPage/MagazinPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import CartPage from "./Pages/CartPage/CartPage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import GoodPage from "./Pages/GoodPage/GoodPage";
import MainPage from "./Pages/MainPage/MainPage";
import NotfoundPage from "./Pages/NotfoundPage/NotfoundPage";
import OrderListPage from "./Pages/OrderListPage/OrderListPage";
import OrderPaidPage from "./Pages/OrderPaidPage/OrderPaidPage";
import PersonalPage from "./Pages/PersonalPage/PersonalPage";
import PlacingAnOrderPage from "./Pages/PlacingAnOrderPage/PlacingAnOrderPage";
import ProductsCategoryPage from "./Pages/ProductsCategoryPage/ProductsCategoryPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import RequireAuth from "./hoc/RequireAuth";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import { PAGE_POSITION } from "./store/slice";
import Category from "./Pages/Category/Category";
import SalePage from "./Pages/SalePage/SalePage";
import Chat from "./Pages/Chat/Chat";

const RoutesComponent = () => {
  const position = useAppSelector((state) => state.page.pagePostion);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(PAGE_POSITION("MAIN"));
  }, [dispatch, location]);
  interface Elements {
    [key: string]: ReactElement;
  }
  const ROUTS_ELEMENT: Elements = {
    magazin: <MagazinPage />,
    chat: <Chat />,
    category: <ProductsCategoryPage />,
    products: <ProductsCategoryPage />,
    account: <AccountPage />,
    favorites: <FavoritesPage />,
    cart: <CartPage />,
    good: <GoodPage />,
    sale: <SalePage />,
    settings: <SettingsPage />,
    placingAnOrderPage: <PlacingAnOrderPage />,
    orderPaidPage: <OrderPaidPage />,
    orderListPage: <OrderListPage />,
    main: <PersonalPage />,
  };
  if (position === "MAIN") {
    return (
      <Routes>
        <Route path={"/"} element={<MainPage />}>
          <Route
            key={Math.random().toString(36)}
            path={"/"}
            element={<MagazinPage />}
          />
          {Object.keys(ROUTS_ELEMENT).map((route) => {
            const key = Math.random().toString(36);

            if (route === "orderPaidPage" || route === "chat") {
              return (
                <Route
                  key={key}
                  path={route}
                  element={<RequireAuth>{ROUTS_ELEMENT[route]}</RequireAuth>}
                />
              );
            }
            if (route === "good") {
              return (
                <Route key={key} path={"good/:id"} element={<GoodPage />} />
              );
            }
            if (route === "category") {
              return (
                <Route
                  key={Math.random().toString(36)}
                  path="category/:categoryName"
                  element={<ProductsCategoryPage />}
                />
              );
            }
            if (route === "products") {
              return (
                <Route
                  key={Math.random().toString(36)}
                  path="products"
                  element={<ProductsCategoryPage />}
                />
              );
            }
            return (
              <Route key={key} path={route} element={ROUTS_ELEMENT[route]} />
            );
          })}
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />}>
        <Route
          key={Math.random().toString(36)}
          path={location.pathname}
          element={<Category />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
