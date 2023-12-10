import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import classes from "./style/MagazinPage.module.css";
import { ImageGood } from "../../UI_Component";
import { Link, useNavigate } from "react-router-dom";
import { GET_SALE_GOODS } from "../../store/slice";
import { keyGenerate } from "../../utils/keyGenerate";

const MagazinPage = () => {
  const { discount } = useAppSelector((state) => state.page.data);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getSale = () => {
    dispatch(GET_SALE_GOODS());
    navigate("../sale")
  }
  return (
    <div className={classes.wrapper}>
      <div onClick={getSale} className={classes.saleHappyNew}>
        <strong>Новогодняя распродажа</strong>
      </div>
      <div className={classes.saleStand}>
        <strong>Здесь могла бы быть ваша реклама</strong>
      </div>{" "}
      <h1>Специальные предложения!</h1>
      <div className={classes.saleWrapper}>
        {discount?.map((item) => {
          const key = keyGenerate();
          return (
            <Link to={`../good/${item.id}`} key={key}>
              <ImageGood path={item.image} size={window.innerWidth / 5 - 20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MagazinPage;
