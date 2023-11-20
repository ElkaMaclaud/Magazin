import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/Catalogs.module.css";
import { ListItem } from "../../UI_Component/ListItem/ListItem";
import { categories } from "../../MockupData/categoryFilter";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppSelector } from "../../store/reduxHooks";

const Catalogs = () => {
  const { goods } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={categories} />
        </SideBar>
      </div>
      <div className={classes.content}>
        <GoodsList data={goods} icon={"like"} />
      </div>
    </div>
  );
};

export default Catalogs;
