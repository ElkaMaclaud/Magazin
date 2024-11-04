import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IGoods } from "../../type/goodsType";
import classes from "./style/GoodPage.module.css";
import { CardPageFlex, ImageGood } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { GET_GOOD } from "../../store/slice";
import { CounterButton } from "../../components/CounterButton/CounterButton";
import ChoiceIcon from "../../components/ChoiceIcon/ChoiceIcon";
import Spinner from "../../components/Spinner/Spinner";
import { ISeller } from "../../type/userType";
const GoodPage = () => {
  const { id } = useParams();
  const { good } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(GET_GOOD(id))
  }, [id, dispatch]);
  const checkProperty = (card: IGoods & { seller: ISeller }) => {
    if ("count" in card) {
      return card.count as number;
    }
    return 0;
  };
  if (!good) return <Spinner />;
  return (
    <CardPageFlex>
      <div className={classes.wrapperGood}>
        <ImageGood path={good.image} size={500} />
        <div className={classes.description}>{good.description}</div>
        <div className={classes.countLikeWrapper}>
          <div className={classes.favorite}><ChoiceIcon favorite={good.favorite} id={good._id} /></div>
          <div><CounterButton
            id={good._id}
            text={good.price}
            title={"Добавить в корзину"}
            counter={checkProperty(good)}
          /></div>
        </div>
      </div>
      <div className={classes.salesmant}>
        <img src={good.seller.image} alt="" />
        <div className={classes.salesmantInfoWrapper}>
          <h2>{good.seller.name}</h2>
          <Link to="../chat">
            Написать продавцу
          </Link>
        </div>
      </div>
    </CardPageFlex>
  );
};

export default GoodPage;
