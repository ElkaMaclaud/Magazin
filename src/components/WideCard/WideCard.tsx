/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  ReactNode,
  useState,
  ChangeEvent,
  useMemo,
  CSSProperties,
} from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { Trash, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../store/reduxHooks";
import {
  CHOICE_BASKET_OF_GOODS,
  REMOVE_GOOD_BASKET_OF_GOODS,
} from "../../store/slice";
import { Link } from "react-router-dom";
import { CounterButton } from "../CounterButton/CounterButton";

export const WideCard: FC<{
  good: IGoods;
  child?: ReactNode;
  orientationVertical?: boolean;
}> = ({ good, child, orientationVertical }) => {
  const SIZE = 270;
  const SIZE_BASKET = 150;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(CHOICE_BASKET_OF_GOODS(good.id));
  };
  const removeBasket = (remove = true) => {
    if (remove) {
      dispatch(REMOVE_GOOD_BASKET_OF_GOODS(good.id));
    }
    setShowModal(false);
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
        height: `${height + height / 2}px`,
        maxHeight: `${height + height / 2}px`,
      };
    }
    return { height: `${height}px`, maxHeight: `${height}px` };
  };
  const ImageWrapper = () => {
    return (
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
        <Link to={`../good/${good.id}`}>
          <ImageGood path={good.image} size={SIZE_BASKET} />
        </Link>
      </div>
    );
  };
  const GoodDescription = () => {
    return (
      <div className={classes.descriptionBasket}>
        <div className={classes.descriptionText}>{good.description}</div>
        <div className={classes.iconBG} onClick={() => setShowModal(true)}>
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
        <Link to={`../good/${good.id}`}>
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
        <div
          className={
            orientationVertical
              ? classes.miniDescription
              : classes[classesChoises[2]]
          }
        >
          {good.description}
        </div>
      );
    }
    return (
      <div
        className={
          orientationVertical
            ? classes.miniDescription
            : classes[classesChoises[2]]
        }
      >
        <GoodDescription />
      </div>
    );
  }, [good.description]);

  const MemoCounterButton = useMemo(() => {
    if (child) {
      return (
        <div className={classes[classesChoises[3]]}>
          <CounterButton
            id={good.id}
            text={good.price}
            title={"Добавить в корзину"}
            counter={checkProperty(good)}
          />
        </div>
      );
    }
    return (
      <div className={classes[classesChoises[4]]}>
        <CounterButton id={good.id} counter={checkProperty(good)} />
      </div>
    );
  }, [good.count]);
  const MemoChoiceIcon = useMemo(
    () => (
      <div className={classes[classesChoises[4]]}>
        <ChoiceIcon favorite={good.favorite} id={good.id} />
      </div>
    ),
    [good.favorite]
  );
  if (child) {
    return (
      <div
        className={
          orientationVertical
            ? classes.wrapperColumn
            : classes[classesChoises[0]]
        }
        style={setSize(SIZE + 30)}
      >
        {MemoImage}
        {MemoDescription}
        {MemoCounterButton}
        {MemoChoiceIcon}
      </div>
    );
  }
  return (
    <div
      className={
        orientationVertical ? classes.wrapperColumn : classes[classesChoises[0]]
      }
      style={setSize(SIZE_BASKET + 20)}
    >
      {showModal && (
        <Modal
          title={"Удалить товар"}
          content={`Вы точно хотите удалить выбранный товар? Отменить данное действие будет невозможно.`}
          buttonText="Удалить"
          handleAction={removeBasket}
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
}
