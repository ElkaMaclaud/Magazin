import React from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import classes from "./style/FavoritesPage.module.css";
import { useAppSelector } from "../../store/reduxHooks";
import { Favorites } from "../../UI_Component/Icons";

const FavoritesPage = () => {
  const { favorite } = useAppSelector((state) => state.page.data.user);
  if (favorite.length) {
    return (
      <div className={classes.wrapper}>
        <GoodsList data={favorite} icon={"like"} />
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.infoWrapper}>
        {" "}
        <h3>В избранном пусто</h3>
        <p>
          Добавляйте товары с помощью <Favorites like />
        </p>
      </div>
    </div>
  );
};

export default FavoritesPage;
