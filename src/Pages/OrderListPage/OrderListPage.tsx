import React from "react";
import { CardPageFlex } from "../../UI_Component";
import { useAppSelector } from "../../store/reduxHooks";
import GoodsList from "../../components/GoodsList/GoodsList";

const OrderListPage = () => {
  const { purchased } = useAppSelector((state) => state.page.data.user);
  if (purchased.length) {
    return <GoodsList data={purchased} />
  }
  return <CardPageFlex><h1>У вас пока нет ни одной покупки!</h1></CardPageFlex>;
};

export default OrderListPage;
