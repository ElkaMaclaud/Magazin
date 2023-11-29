import React from "react";
import { CardForInfo, CardPageFlex } from "../../UI_Component";
import { Complite } from "../../UI_Component/Icons";
import classes from "./style/OrderPaidPage.module.css";

const OrderPaidPage = () => {
  return (
    <CardPageFlex>
      <CardForInfo>
        <div className={classes.headerWrapper}>
          <h1>Заказ оплачен и оформлен</h1>
          <Complite />
        </div>
      </CardForInfo>
    </CardPageFlex>
  );
};

export default OrderPaidPage;
