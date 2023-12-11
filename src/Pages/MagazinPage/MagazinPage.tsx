import React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import classes from "./style/MagazinPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Link } from "react-router-dom";

const MagazinPage = () => {
  const { discount } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.wrapper}>
      <Link to="../sale" className={classes.saleHappyNew}>
        <strong>Новогодняя распродажа</strong>
      </Link>
      <div className={classes.saleStand}>
        <strong>Здесь могла бы быть ваша реклама</strong>
      </div>{" "}
      <h1>Специальные предложения!</h1>
      <GoodsList orientationVertical data={discount} icon="like" />;
    </div>
  );
};

export default MagazinPage;
