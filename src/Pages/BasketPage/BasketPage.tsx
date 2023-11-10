import React, { useState, useEffect } from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import { goods } from "../../MockupData/goods";
import classes from "./style/BasketPage.module.css";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";
import { Link } from "react-router-dom";
import { Share, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../../components/Modal/Modal";

const BasketPage = () => {
  //const {} = useAppSelector((state) => state.page);
  const [list, setList] = useState(() => goods.filter((item) => item.count));
  const [checked, setChecked] = useState(false);
  const [sum, setSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (list.filter((item) => item.choice).length === list.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setSum(
      list.reduce((prev, current) => {
        if (current.choice && current.count) {
          return prev + current.count * current.price;
        }
        return prev;
      }, 0)
    );
  }, [list]);
  const onChange = () => {
    setChecked(!checked);
    setList((prev) =>
      prev.map((item) => {
        return { ...item, choice: !checked };
      })
    );
  };
  const removeChoiceGoods = () => {
    setShowModal(true);
  };
  const removeBasket = (remove = true) => {
    if (remove) {
      setList((prev) => prev.filter((item) => !item.choice));
    }
    setShowModal(false);
  };
  const BasketHeader = () => {
    if (list.filter((item) => item.choice).length) {
      return (
        <div className={classes.basketHeaderWrapper}>
          <div className={classes.basketHeaderWrapperchild}>
            <label htmlFor="checkbox" className={classes.inputWrapper}>
              <input
                type="checkbox"
                id="checkbox"
                onChange={onChange}
                checked={checked}
              />
              <div className={classes.checkHover}>
                <СheckMark />
              </div>
            </label>
            <p onClick={onChange}>Выбрать все </p>
            <p onClick={removeChoiceGoods}>Удалить выбранные</p>
          </div>
          <div className={classes.basketHeaderWrapperchild}>
            <Share />
            <p>Поделиться</p>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.basketHeaderWrapper}>
        <div className={classes.basketHeaderWrapperchild}>
          <label htmlFor="checkbox" className={classes.inputWrapper}>
            <input
              type="checkbox"
              id="checkbox"
              onChange={onChange}
              checked={checked}
            />
            <div className={classes.checkHover}>
              <СheckMark />
            </div>
          </label>
          <p onClick={onChange}>Выбрать все </p>
        </div>{" "}
      </div>
    );
  };

  if (list.length === 0) {
    return (
      <div className={classes.contentWrapper}>
        <h2>Корзина пуста</h2>
        <p>
          Воспользуйтесь поиском, чтобы найти всё, что нужно.{" "}
          <p>Если в корзине были товары</p> - <Link to="profile">войдите</Link>{" "}
          , чтобы посмотреть список.
        </p>
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        <h2>Корзина</h2>
        <div className={classes.basketWrapper}>
          <div className={classes.basket}>
            <BasketHeader />
            <div className={classes.line}></div>
            <GoodsList data={list} setList={setList}/>
          </div>
          {showModal && (
            <Modal
              title={"Удалить товары"}
              text={`Вы точно хотите удалить выбранные товары? Отменить данное действие будет невозможно.`}
              removeBasket={removeBasket}
            />
          )}
          <div className={classes.calculationRegistration}>
            <CalculateAndRegisration
              sum={sum}
              countGood={list.filter((item) => item.choice).length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
