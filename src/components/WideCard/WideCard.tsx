/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  ReactNode,
  memo,
  useState,
  ChangeEvent,
  useMemo,
} from "react";
import classes from "./style/WideCard.module.css";
import { IGoods } from "../../type/goodsType";
import { CounterButton, ImageGood } from "../../UI_Component";
import ChoiceIcon from "../ChoiceIcon/ChoiceIcon";
import { Trash, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../store/reduxHooks";
import {
  CHOICE_BASKET_OF_GOODS,
  REMOVE_GOOD_BASKET_OF_GOODS,
} from "../../store/slice";
import { Link } from "react-router-dom";

export const WideCard: FC<{
  good: IGoods;
  child?: ReactNode;
}> = memo(({ good, child }) => {
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
      return card.count;
    }
    return 0;
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
          <ImageGood path={good.image} size={150} />
        </Link>
      </div>
    );
  };
  const GoodDescription = () => {
    return (
      <div className={classes.descriptionBasket}>
        <div>{good.description}</div>
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
        <div className={classes[classesChoises[2]]}>{good.description}</div>
      );
    }
    return (
      <div className={classes[classesChoises[2]]}>
        <GoodDescription />
      </div>
    );
  }, []);

  const MemoCounterButton = useMemo(() => {
    if (child) {
      return (
        <div className={classes[classesChoises[3]]}>
          <CounterButton
            id={good.id}
            text={good.price}
            title={"Добавить в корзину"}
            counter={checkProperty(good) || 0}
          />
        </div>
      );
    }
    return (
      <div className={classes[classesChoises[4]]}>
        <CounterButton id={good.id} counter={checkProperty(good) || 0} />
      </div>
    );
  }, []);
  const MemoChoiceIcon = useMemo(
    () => (
      <div className={classes[classesChoises[4]]}>
        <ChoiceIcon favorite={good.favorite} id={good.id} />
      </div>
    ),
    []
  );
  if (child) {
    return (
      <div className={classes[classesChoises[0]]}>
        {MemoImage}
        {MemoDescription}
        {MemoCounterButton}
        {MemoChoiceIcon}
      </div>
    );
  }
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
      {MemoImage}
      {MemoDescription}
      <div className={classes[classesChoises[3]]}>
        <div>{good.price * (good.count ? good.count : 1)}</div>
      </div>
      {MemoCounterButton}
    </div>
  );
});
