import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import {
  GET_BASKET_OF_GOODS,
  GET_FAVORITE_GOODS,
  GET_SALE_GOODS,
} from "./store/slice";
import RoutesComponent from "./RoutesComponent";
import MagazinPage from "./Pages/MagazinPage/MagazinPage";

function App() {
  const page = useAppSelector((state) => state.page.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_SALE_GOODS());
    dispatch(GET_BASKET_OF_GOODS());
    dispatch(GET_FAVORITE_GOODS());
  }, [dispatch]);

  if (page === "COMPLICATED") {
    return <RoutesComponent />;
  }
  if (page === "LOADING") {
    return <LoadingPage />;
  }
  return (
    <Routes>
      <Route
        key={Math.random().toString(36)}
        path={"/"}
        element={<MagazinPage />}
      />
      ;
    </Routes>
  );
}

export default App;
