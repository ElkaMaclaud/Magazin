import React, { FC, ReactNode, memo, useState, ChangeEvent } from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { CounterButton, ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { Trash, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../store/reduxHooks";
import {
  ADD_BASKET_OF_GOODS,
  CHANGE_FAVORITE_GOOD,
  CHOICE_BASKET_OF_GOODS,
  DECREMENT_BASKET_OF_GOODS,
  REMOVE_GOOD_BASKET_OF_GOODS,
} from "../../store/slice";

interface WideCardProps {
  firstChild: ReactNode;
  sedondChild: ReactNode;
  treeChild: ReactNode;
  icon: ReactNode;
}

export const WideCard: FC<{
  good: IGoods;
  child?: ReactNode;
  setList?: React.Dispatch<React.SetStateAction<IGoods[]>>}> =
  memo(({ good, child, setList }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(CHOICE_BASKET_OF_GOODS(good.id));
    setList &&
      setList((prev) =>
        prev.map((item) => {
          if (item.id === good.id) {
            return {...item, choice: e.target.checked}
          }
          return item;
        })
      );
  };
  const addFavorites = () => {
    dispatch(CHANGE_FAVORITE_GOOD(good.id));
  };
  const addBasket = (increment: number) => {
    if (increment > 0) {
      dispatch(ADD_BASKET_OF_GOODS(good.id));
    } else {
      dispatch(DECREMENT_BASKET_OF_GOODS(good.id));
    }
    setList &&
    setList((prev) =>
      prev.map((item) => {
        if (item.id === good.id) {
         return {...item, count: item.count && (item.count + increment )};
        }
        return item;
      })
    );
  };
  const removeBasket = (remove = true) => {
    if (remove) {
      dispatch(REMOVE_GOOD_BASKET_OF_GOODS(good.id));
      setList && setList((prev) => prev.filter((elem) => elem.id !== good.id));
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
        counter={checkProperty(card) || 0}
      />
    );
  };
  const props: WideCardProps = {
    firstChild: child ? (
      <ImageGood path={good.image} />
    ) : (
      <div className={classes.checkGood}>
        <label htmlFor={`${good.id}`} className={classes.inputWrapper}>
          <input
            type="checkbox"
            id={`${good.id}`}
            onChange={onChange}
            checked={good.choice || false}
          />
          <div className={classes.checkHover}>
            <СheckMark />
          </div>
        </label>
        <ImageGood path={good.image} size={150} />
      </div>
    ),
    sedondChild: child ? (
      good.description
    ) : (
      <div className={classes.descriptionBasket}>
        <div>{good.description}</div>
        <div className={classes.iconBG} onClick={() => setShowModal(true)}>
          <Trash />
        </div>
      </div>
    ),
    treeChild: child ? (
      <ElementRender card={good} />
    ) : (
      <Summ price={good.price * (good.count ? good.count : 1)} />
    ),
    icon: child ? (
      <ChoiceIcon
        favorite={good.favorite}
        onClick={addFavorites}
        id={good.id}
      />
    ) : (
      <ElementRender card={good} simple={true} />
    ),
  };
  const { firstChild, sedondChild, treeChild, icon } = props;
  const classesChoises = child
    ? ["card", "firstChild", "sedondChild", "treeChild", "like"]
    : [
        "cardSmall",
        "firstChildSmall",
        "sedondChildSmall",
        "treeChildSmall",
        "fourthChild",
      ];
  return (
    <div className={classes[classesChoises[0]]}>
      {showModal && (
        <Modal
          title={"Удалить товар"}
          content={`Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно.`}
          buttonText="Удалить"
          handleAction={removeBasket}
        />
      )}
      <div className={classes[classesChoises[1]]}>{firstChild}</div>
      <div className={classes[classesChoises[2]]}>{sedondChild}</div>
      <div className={classes[classesChoises[3]]}>{treeChild}</div>
      <div className={classes[classesChoises[4]]}>{icon}</div>
    </div>
  );
});
