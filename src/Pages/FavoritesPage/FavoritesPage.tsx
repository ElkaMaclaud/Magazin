import React from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import classes from "./style/FavoritesPage.module.css";
import { useAppSelector } from "../../store/reduxHooks";

const FavoritesPage = () => {
  const { favorite } = useAppSelector((state) => state.page.data.user);
  return (
    <div className={classes.wrapper}>
      <GoodsList data={favorite} icon={"like"} />
    </div>
  );
};

export default FavoritesPage;
