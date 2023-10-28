import React from "react";
import classes from "./style/MainPage.module.css";
import Header from "../Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import Content from "../Content/Content";

const MainPage = () => {
  return (
    <div className={classes.wrapperPage}>
      <Header />
      <Content />
    </div>
  );
};

export default MainPage;
