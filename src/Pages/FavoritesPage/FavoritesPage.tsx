import React, { useEffect, useState } from "react";
import { IGoods } from "../../type/goodsType";
import { goods } from "../../MockupData/goods";
import GoodsList from "../../components/GoodsList/GoodsList";

const FavoritesPage = () => {
  const [data, setData] = useState<IGoods[]>(goods.filter((item) => item.favorite));

  return <GoodsList data={goods.filter((item) => item.favorite)} icon={"like"}/>;
};

export default FavoritesPage;
