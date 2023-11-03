import React, { useEffect, useState } from "react";
import { IGoods } from "../../type/goodsType";
import GoodsList from "../../components/GoodsList/GoodsList";
import { goods } from "../../MockupData/goods";

const BasketPage = () => {
  return (
      <GoodsList data={goods.filter((item) => item.count)} />
  );
};

export default BasketPage;
