import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IGoods } from "../../type/goodsType";
import classes from "./style/GoodPage.module.css";
import { CardPageFlex, CounterButton, ImageGood } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { GET_GOOD } from "../../store/slice";

const GoodPage = () => {
  const { id } = useParams();
  const { good } = useAppSelector((state) => state.page.data.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(GET_GOOD(id))
  }, [id, dispatch]);
  const checkProperty = (card: IGoods) => {
    if ("count" in card) {
      return card.count as number;
    }
    return 0;
  };
  if (!good) return null;
  return (
    <CardPageFlex>
      <div className={classes.wrapperGood}>
        <ImageGood path={good.image} size={500} />
        <div className={classes.description}>{good.description}</div>
        <div>
          <CounterButton
            id={good.id}
            text={good.price}
            title={"Добавить в корзину"}
            counter={checkProperty(good)}
          />
        </div>
      </div>
    </CardPageFlex>
  );
};

export default GoodPage;
