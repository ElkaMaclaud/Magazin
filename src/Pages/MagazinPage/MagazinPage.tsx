import React from "react";
import { useAppSelector } from "../../store/reduxHooks";
import classes from "./style/MagazinPage.module.css";
import { ImageGood } from "../../UI_Component";
import { Link } from "react-router-dom";

const MagazinPage = () => {
  const { sale } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.wrapper}>
      <div className={classes.saleHappyNew}>
        <strong>Новогодняя распродажа</strong>
      </div>
      <div className={classes.saleStand}>
        <strong>Здесь могла быть ваша реклама</strong>
      </div>
      <div className={classes.saleWrapper}>
        {sale?.map((item) => {
          const key = Math.random().toString(36).substring(2, 15);
          return (
            <Link to={`../good/${item.id}`} key={key}>
              <ImageGood path={item.image} size={window.innerWidth / 5 - 20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MagazinPage;
