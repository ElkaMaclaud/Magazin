import React, { useEffect } from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import classes from "./style/FavoritesPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { Favorites } from "../../UI_Component/Icons";
import { GET_FAVORITE_GOODS } from "../../store/slice";

const FavoritesPage = () => {
  const { data, isloading } = useAppSelector((state) => state.page);
  const { favorite } = data.user;
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(GET_FAVORITE_GOODS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isloading && !favorite.length) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.infoWrapper}>
          <h3>В избранном пусто</h3>
          <p>
            Добавляйте товары с помощью <Favorites like />
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <GoodsList data={favorite} icon={"like"} />
    </div>
  );
};

export default FavoritesPage;
