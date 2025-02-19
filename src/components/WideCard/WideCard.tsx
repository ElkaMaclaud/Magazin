/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  ReactNode,
  ChangeEvent,
  useMemo,
  CSSProperties,
  memo,
} from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { Trash, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../store/reduxHooks";
import {
  SELECTING_PRODUCTS_IN_THE_CART ,
  REMOVE_FROM_CART_OF_GOODS ,
} from "../../store/slice";
import { Link } from "react-router-dom";
import { CounterButton } from "../CounterButton/CounterButton";
import { useToggle } from "../../hooks/useToggle";

export const WideCard: FC<{
  good: IGoods;
  child?: ReactNode;
  orientationVertical?: boolean;
}> = memo(({ good, child, orientationVertical }) => {
  const SIZE = 270;
  const SIZE_cart = 150;
  const [showModal, toggleShowModal] = useToggle(false);
  const dispatch = useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(SELECTING_PRODUCTS_IN_THE_CART (good._id));
  };
  const removecart = (remove = true) => {
    if (remove) {
      dispatch(REMOVE_FROM_CART_OF_GOODS (good._id));
    }
    toggleShowModal();
  };

  const checkProperty = (card: IGoods) => {
    if ("count" in card) {
      return card.count as number;
    }
    return 0;
  };
  const setSize = (height: number): CSSProperties => {
    if (orientationVertical) {
      return {
        width: `${height + 30}px`,
        maxWidth: `${height + 30}px`,
        height: `${height * 1.3}px`,
        maxHeight: `${height * 1.3}px`,
      };
    }
    return { height: `${height}px`, maxHeight: `${height}px` };
  };
  const ImageWrapper = () => {
    return (
      <div className={classes.checkGood}>
        <label htmlFor={`${good._id}`} className={classes.inputWrapper}>
          <input
            type="checkbox"
            id={`${good._id}`}
            onChange={onChange}
            checked={good.choice || false}
          />
          <div className={classes.checkHover}>
            <СheckMark />
          </div>
        </label>
        <Link to={`../good/${good._id}`}>
          <ImageGood path={good.image} size={SIZE_cart} />
        </Link>
      </div>
    );
  };
  const GoodDescription = () => {
    return (
      <div className={classes.descriptioncart}>
        <div className={classes.descriptionText}>{good.description}</div>
        <div className={classes.iconBG} onClick={toggleShowModal}>
          <Trash />
        </div>
      </div>
    );
  };
  const classesChoises = child
    ? ["card", "firstChild", "sedondChild", "treeChild", "like"]
    : [
        "cardSmall",
        "firstChildSmall",
        "sedondChildSmall",
        "treeChildSmall",
        "fourthChild",
      ];

  const MemoImage = useMemo(() => {
    if (child) {
      return (
        <Link to={`../good/${good._id}`}>
          <div className={classes[classesChoises[1]]}>
            <ImageGood path={good.image} />
          </div>
        </Link>
      );
    }
    return (
      <div className={classes[classesChoises[1]]}>
        <ImageWrapper />
      </div>
    );
  }, [good.choice]);
  const MemoDescription = useMemo(() => {
    if (child) {
      return (
        <div className={classes[classesChoises[2]]}>{good.description}</div>
      );
    }
    return (
      <div className={classes[classesChoises[2]]}>
        <GoodDescription />
      </div>
    );
  }, [good.description]);

  const MemoCounterButton = useMemo(() => {
    if (child) {
      return (
        <div className={classes[classesChoises[3]]}>
          <CounterButton
            id={good._id}
            text={good.price}
            title={"Добавить в корзину"}
            counter={checkProperty(good)}
            style={orientationVertical ? {paddingBottom: "0", gap: "10px"} : {}}
          />
        </div>
      );
    }
    return (
      <div className={classes[classesChoises[4]]}>
        <CounterButton id={good._id} counter={checkProperty(good)} />
      </div>
    );
  }, [good.count]);
  const MemoChoiceIcon = useMemo(
    () => (
      <div className={classes[classesChoises[4]]}>
        <ChoiceIcon favorite={good.favorite} id={good._id} />
      </div>
    ),
    [good.favorite]
  );
  if (orientationVertical) {
    return (
      <div className={classes.wrapperColumn} style={setSize(SIZE + 30)}>
        <div>
          {MemoImage} {MemoChoiceIcon}
        </div>
        {MemoCounterButton}
      </div>
    );
  }
  if (child) {
    return (
      <div className={classes[classesChoises[0]]} style={setSize(SIZE + 30)}>
        {MemoImage}
        {MemoDescription}
        {MemoCounterButton}
        {MemoChoiceIcon}
      </div>
    );
  }
  return (
    <div
      className={classes[classesChoises[0]]}
      style={setSize(SIZE_cart + 20)}
    >
      {showModal && (
        <Modal
          title={"Удалить товар"}
          content={`Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно.`}
          buttonText="Удалить"
          handleAction={removecart}
        />
      )}
      {MemoImage}
      {MemoDescription}
      <div className={classes[classesChoises[3]]}>
        <div>{good.price * (good.count ? good.count : 1)}</div>
      </div>
      {MemoCounterButton}
    </div>
  );
});
