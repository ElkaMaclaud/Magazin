import React from "react";
import { goods } from "../../MockupData/goods";
import GoodsList from "../../components/GoodsList/GoodsList";
import classes from "./style/FavoritesPage.module.css";

const FavoritesPage = () => {
  return (
    <div className={classes.wrapper}>
      <GoodsList data={goods.filter((item) => item.favorite)} icon={"like"} />
    </div>
  );
};

export default FavoritesPage;
