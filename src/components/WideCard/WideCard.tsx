import React, { FC, ReactNode, memo, useState } from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { CounterButton, ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { goods } from "../../MockupData/goods";

interface WideCardProps {
  firstChild: ReactNode;
  sedondChild: ReactNode;
  treeChild: ReactNode;
  icon: ReactNode;
}

export const WideCard: FC<{ item: IGoods; child?: ReactNode }> = memo(
  ({ item, child }) => {  
    const [localGoods, setLocalGoods] = useState<IGoods[]>(goods)
    const addFavorites = (id: string) => {
      setLocalGoods((prev) => prev.map((item) => {
        if (item.id === id) {
          item.favorite = item.favorite === true ? false : true;
        }
        return item
      }))
    };
    const addBasket = (id: string, increment: number) => {
      setLocalGoods((prev) => prev.map((item) => {
        if (item.id === id) {
          item.count = item.count !== undefined ? (item.count += increment) : 1;
        }
        return item
      }))
    };
    const checkProperty = (card: IGoods) => {
      if ("count" in card) {
        return card.count;
      }
      return 0;
    };
    const Summ: FC<{ price: number }> = ({ price }) => {
      return <div>{price}</div>;
    };
    const ElementRender: FC<{ card: IGoods; simple?: boolean }> = ({
      card,
      simple,
    }) => {
      return (
        <CounterButton
          text={simple ? null : item.price}
          title={"Добавить в корзину"}
          handleClick={addBasket}
          id={item.id}
          counter={checkProperty(item) || 0}
        />
      );
    };
    const props: WideCardProps = {
      firstChild: child ? (
        <div className={classes.checkGood}>
          <input type="checkbox"></input>
          <ImageGood path={item.image[0]} onClick={() => console.log("")} />
        </div>
      ) : (
        <ImageGood path={item.image[0]} onClick={() => console.log("")} />
      ),
      sedondChild: item.description,
      treeChild: child ? (
        <ElementRender card={item} />
      ) : (
        <Summ price={item.price * (item.count ? item.count : 1)} />
      ),
      icon:
        child === "like" ? (
          <ChoiceIcon
            favorite={item.favorite}
            onClick={addFavorites}
            id={item.id}
          />
        ) : (
          <ElementRender card={item} simple={true} />
        ),
    };
    const { firstChild, sedondChild, treeChild, icon } = props;
    return (
      <div className={classes.card}>
        <div className={classes.firstChild}>{firstChild}</div>
        <div className={classes.sedondChild}>{sedondChild}</div>
        <div className={classes.treeChild}>{treeChild}</div>
        <div className={classes.like}>{icon}</div>
      </div>
    );
  }
);
