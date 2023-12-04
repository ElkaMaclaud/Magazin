import React from "react";
import classes from "./style/MainPage.module.css";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Up } from "../../UI_Component";

const MainPage = () => {
  return (
    <div className={classes.wrapperPage}>
      <Header />
      <div className={classes.content}>
        <Outlet />
        <div className={classes.scrollUp}><Up /></div>
      </div>
    </div>
  );
};

export default MainPage;
