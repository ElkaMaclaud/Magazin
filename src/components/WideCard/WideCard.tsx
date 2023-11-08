import React, { FC, ReactNode, memo, useState, useEffect } from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { CounterButton, ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { goods } from "../../MockupData/goods";
import { Trash } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";

interface WideCardProps {
  firstChild: ReactNode;
  sedondChild: ReactNode;
  treeChild: ReactNode;
  icon: ReactNode;
}

export const WideCard: FC<{ item: IGoods; child?: ReactNode }> = memo(
  ({ item, child }) => {
    const [showModal, setShowModal] = useState(false);
    const [localGoods, setLocalGoods] = useState<IGoods[]>(goods);
    const [checkGood, setCheckGood] = useState(false);
    const onChange = () => {
      setCheckGood(!checkGood);
    };
    const addFavorites = (id: string) => {
      setLocalGoods((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            item.favorite = item.favorite === true ? false : true;
          }
          return item;
        })
      );
    };
    const addBasket = (id: string, increment: number) => {
      setLocalGoods((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            item.count =
              item.count !== undefined ? (item.count += increment) : 1;
          }
          return item;
        })
      );
    };
    const removeBasket = (remove=true) => {
      if (remove) {
        setLocalGoods((prev) =>
        prev.map((elem) => {
          if (elem.id === item.id) {
            item.count = 0;
          }
          return item;
        })
      );
      }
      setShowModal(false);
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
          text={simple ? null : card.price}
          title={"Добавить в корзину"}
          handleClick={addBasket}
          id={card.id}
          counter={checkProperty(card) || 0}
        />
      );
    };
    const props: WideCardProps = {
      firstChild: child ? (
        <ImageGood path={item.image[0]} onClick={() => console.log("")} />
      ) : (
        <div className={classes.checkGood}>
          <input type="checkbox" onChange={onChange}></input>
          <ImageGood path={item.image[0]} onClick={() => console.log("")} />
        </div>
      ),
      sedondChild: child ? (
        item.description
      ) : (
        <div className={classes.descriptionBasket}>
          <div>{item.description}</div>
          <div className={classes.iconBG} onClick={() => setShowModal(true)}>
            <Trash />
          </div>
        </div>
      ),
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
    const classesChoises = child ? ["card", "firstChild", "sedondChild", "treeChild", "like"] : ["cardSmall", "firstChildSmall", "sedondChildSmall", "treeChildSmall", "fourthChild"] 
    return (
      <div className={classes[classesChoises[0]]}>
        {showModal && (
          <Modal
            title={"Удалить товар"}
            text={`Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно.`}
            removeBasket={removeBasket}
          />
        )}
        <div className={classes[classesChoises[1]]}>{firstChild}</div>
        <div className={classes[classesChoises[2]]}>{sedondChild}</div>
        <div className={classes[classesChoises[3]]}>{treeChild}</div>
        <div className={classes[classesChoises[4]]}>{icon}</div>
      </div>
    );
  }
);
