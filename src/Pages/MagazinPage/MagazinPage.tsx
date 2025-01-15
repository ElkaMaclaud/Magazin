import React, { CSSProperties, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import classes from "./style/MagazinPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { Link } from "react-router-dom";
import { GET_DISCOUNT_GOODS } from "../../store/slice";
import { Slider } from "../../UI_Component";

const style: CSSProperties = {
  objectFit: "fill",
  borderRadius: "20px",
};
const MagazinPage = () => {
  const { discount } = useAppSelector((state) => state.page.data);
  const [width] = useState(window.innerWidth - 60 > 1400 ? 1400 : window.innerWidth - 60)
  const dispatch = useAppDispatch();
  const list = [
    "https://zapovednaya-polyana.ru/upload/iblock/02b/02b8338e4070e7982c58c04566973411.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMEivlPv2zTrLdZDZbnhezCFuzgeDCU9O56Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEq7udET_AWKTWSje2Y2q80xUibt8Zq43M4Q&s",
  ];
  useEffect(() => {
    dispatch(GET_DISCOUNT_GOODS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.wrapper}>
      <Link to="../sale" className={classes.saleHappyNew}>
        <Slider list={list} style={style} width={width} height={298} noMargin imageNoBorder />
        <strong className={classes.text}>Распроджа</strong>
      </Link>
      <div className={classes.saleStand}>
        <strong>Здесь могла бы быть ваша реклама</strong>
      </div>{" "}
      <h1>Специальные предложения!</h1>
      <GoodsList orientationVertical data={discount} icon="like" />
    </div>
  );
};

export default MagazinPage;
