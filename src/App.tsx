import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import RoutesComponent from "./RoutesComponent";
import MagazinPage from "./Pages/MagazinPage/MagazinPage";
import { GET_DISCOUNT_GOODS } from "./store/slice";
import LoginPage from "./Pages/LoginPage/LoginPage";

function App() {
  // const page = useAppSelector((state) => state.page.loading);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(GET_DISCOUNT_GOODS());
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
    return <RoutesComponent />;
}

export default App;
