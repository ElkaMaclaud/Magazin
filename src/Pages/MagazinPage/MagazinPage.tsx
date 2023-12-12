import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import classes from "./style/MagazinPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Link } from "react-router-dom";
import { GET_DISCOUNT_GOODS } from "../../store/slice";

const MagazinPage = () => {
  const { discount } = useAppSelector((state) => state.page.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_DISCOUNT_GOODS());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
