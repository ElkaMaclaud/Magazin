import React, { FC } from "react";
import classes from "./style/TwoColorCard.module.css";
import { Link } from "react-router-dom";
import { IDelivery } from "../../type/userType";
import { ImageGood } from "../ImageGood/ImageGood";

export const TwoColorCard: FC<{
  id: string;
  price: number;
  image: string;
  delivery: IDelivery;
}> = ({ id, price, image, delivery }) => {
  return (
    <div className={classes.wrapperCard}>
      <div className={classes.headerCard}>
        <div className={classes.orderHeader}>
          <h3>Заказ</h3>
          <Link to="" className={classes.link}>{id}</Link>
        </div>
        <div className={classes.price}>
          <p>оплачено</p>
          <h3>{price} ₽</h3>
        </div>
      </div>
      <div className={classes.contentCard}>
        <div className={classes.textcontentCard}>
          <div>
            Доставка в{" "}
            {`${
              delivery.choice === "pickUpPoin"
                ? "пунк выдачи"
                : delivery.address
            }`}
          </div>
          <div>Дата доставки: {`${new Date()}`}</div>
          <div>
            <button className={classes.buttonOrderEval}>Оценить заказ</button>
            <button className={classes.buttonOrderGood}>Оценить товар</button>
          </div>
        </div>
        <div><ImageGood path={image} size={100}/></div>
      </div>
    </div>
  );
};
