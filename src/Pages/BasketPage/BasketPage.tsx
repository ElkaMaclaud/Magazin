import React from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import { goods } from "../../MockupData/goods";

const BasketPage = () => {
  return (
      <GoodsList data={goods.filter((item) => item.count)} />
  );
};

export default BasketPage;
