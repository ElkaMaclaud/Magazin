import React from "react";
import { goods } from "../../MockupData/goods";
import GoodsList from "../../components/GoodsList/GoodsList";

const FavoritesPage = () => {
   return <GoodsList data={goods.filter((item) => item.favorite)} icon={"like"}/>;
};

export default FavoritesPage;
