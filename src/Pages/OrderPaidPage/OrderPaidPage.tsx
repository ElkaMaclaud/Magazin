import React from "react";
import { CardForInfo, CardPageFlex } from "../../UI_Component";
import { Complite } from "../../UI_Component/Icons";
import classes from "./style/OrderPaidPage.module.css";
import { useAppSelector } from "../../store/reduxHooks";

const OrderPaidPage = () => {
  const { purchased } = useAppSelector((state) => state.page.data.user);
  const text = purchased.length ? "Заказ оплачен и оформлен" : "Чт-то пошло не так... Повторите попытку"
  return (
    <CardPageFlex>
      <CardForInfo>
        <div className={classes.headerWrapper}>
          <h1>{text}</h1>
          <Complite />
        </div>
      </CardForInfo>
    </CardPageFlex>
  );
};

export default OrderPaidPage;
