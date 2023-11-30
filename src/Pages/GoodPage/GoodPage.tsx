import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGoods } from "../../type/goodsType";
import { goods } from "../../MockupData/goods";
import classes from "./style/GoodPage.module.css";
import { CardPageFlex, ImageGood } from "../../UI_Component";

const GoodPage = () => {
  const { id } = useParams();
  const [good, setGood] = useState<IGoods>();
  useEffect(() => {
    setGood(() => goods.find((item) => item.id === id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!good) return null;
  return (
    <CardPageFlex>
      <div className={classes.wrapperGood}>
        <ImageGood path={good.image} size={500} />
        <div className={classes.description}>{good.description}</div>
        <div>{good.price}</div>
      </div>
    </CardPageFlex>
  );
};

export default GoodPage;
