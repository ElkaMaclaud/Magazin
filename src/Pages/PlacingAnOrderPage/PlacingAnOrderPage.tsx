import React from "react";
import classes from "./style/PlacingAnOrderPage.module.css";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";
import { Link, useNavigate } from "react-router-dom";
import { CardPageFlex } from "../../UI_Component";
import PlacingAnOrder from "../../components/PlacingAnOrder/PlacingAnOrder";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { PAY_GOODS } from "../../store/slice";

const styles = {
  height: "50px",
  color: "#fff",
  width: "100%",
  transition: ".3s linear",
};
const stylesHover = {
  height: "50px",
  color: "#fff",
  width: "100%",
};
const stylesDisabled = {
  height: "50px",
  color: "#ccc",
  width: "100%",
  backgroundColor: "#eee",
};
const PlacingAnOrderPage = () => {
  const { user } = useAppSelector((state) => state.page.data);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sum = user.registered.reduce((prev, current) => {
    if (current.count) {
      return prev + current.count * current.price;
    }
    return prev;
  }, 0);
  const len = user.registered.reduce((prev, current) => {
    if (current.choice && current.count) {
      return prev + current.count;
    }
    return prev;
  }, 0);
  const basket = [
    {
      name: <h2 className={classes.headerName}>Ваш корзина</h2>,
      value: (
        <p>{`${len} ${len > 4 ? "товаров" : len > 1 ? "товара" : "товар"}`}</p>
      ),
    },
    {
      name: (
        <div className={classes.goods}>
          Товары<div>{`(${len})`}</div>
        </div>
      ),
      value: `${sum * 10} ₽`,
    },
    {
      name: <div className={classes.name}>Скидка</div>,
      value: <div style={{ color: "red" }}>{`- ${(sum / 100) * 20} ₽`}</div>,
    },
    {
      name: <div className={classes.name}>Стоимость доставки</div>,
      value: <div style={{ color: "#10c44c" }}>Бесплатно</div>,
    },
  ];
  const pay = [
    { name: <h2 className={classes.headerName}>Итого</h2>, value: `${sum} ₽` },
  ];
  const obj = [basket, pay];
  const handlePurchase = () => {
    navigate("../orderPaidPage");
    if (token) {
      dispatch(PAY_GOODS());
    }
  };
  return (
    <CardPageFlex
      // maxWidth={1200}
      children={[
        <>
          <Link to="../basket" className={classes.link}>
            Вернуться в корзину
          </Link>
          <h2 className={classes.headerPlacing}>Оформление заказа</h2>
        </>,
        <div>
          <PlacingAnOrder />
        </div>,
        <CalculateAndRegisration
          handler={handlePurchase}
          sum={sum}
          title={"Оплатить"}
          obj={obj}
          stylesForButton={[styles, stylesHover, stylesDisabled]}
        />,
      ]}
    />
  );
};

export default PlacingAnOrderPage;
