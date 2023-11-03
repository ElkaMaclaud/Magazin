import React, { FC, ReactNode, useState, useMemo } from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";
import { CounterButton, ImageGood } from "../../UI_Component";
import classes from "./style/FavoritesList.module.css";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";

const FavoritesList: FC<{
  data: IGoods[];
  icon?: ReactNode;
}> = ({ data, icon }) => {
  const [list, setList] = useState(data);
  const addFavorites = (id: string) => {
    setList((prev) => prev.map((item) => {
      if (item.id === id) {
        item.favorite = item.favorite === true ? false : true;
      }
      return item
    }))
  };
  const addBasket = (id: string) => {
    const good = list.find((item) => item.id === id);
    if (good) {
        setList((prev) => prev.map((item) => {
          if (item.id === id) {
            item.count = item.count ? item.count += 1 : 1;
          }
          return item
        }))
    }
  };
  const checkProperty = (item: IGoods) => {
    if ("count" in item) {
      return item.count;
    }
    return 0;
  };
  const Summ: FC<{price: number}> = ({price}) => {
    return (
      <div>{price}</div>
    )
  }
  const ElementRender: FC<{item: IGoods, simple?: boolean}> = ({item, simple}) => {
      return (   
        <CounterButton
          text={simple ? null : item.price}
          title={"Добавить в корзину"}
          handleClick={addBasket}
          id={item.id}
          counter={checkProperty(item) || 0}
      />
      )
  }
  return (
    <div key={Math.floor(Math.random()).toString(36).substring(2, 15)}>
      {list.map((item) => {
        const props = {
          firstChild: icon ? (
            <div className={classes.checkGood}>
              <input type="checkbox"></input>
              <ImageGood path={item.image[0]} onClick={() => console.log("")} />
            </div>
          ) : (
            <ImageGood path={item.image[0]} onClick={() => console.log("")} />
          ),
          sedondChild: item.description,
          treeChild: icon ?  <ElementRender item={item} /> : <Summ price={item.price * (item.count ? item.count : 1)} /> ,
          icon: icon === "like" ? <ChoiceIcon favorite={item.favorite} onClick={addFavorites} id={item.id}/> : <ElementRender item={item} simple={true} />,
        };
        return <WideCard key={item.id} props={props} />;
      })}
    </div>
  );
};

export default FavoritesList;
