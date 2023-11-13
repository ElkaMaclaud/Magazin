import React, { useState, useEffect } from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import { goods } from "../../MockupData/goods";
import classes from "./style/BasketPage.module.css";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";
import { Link } from "react-router-dom";
import { Share, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../../components/Modal/Modal";
import { CardPageFlex } from "../../UI_Component";
const styles = {
  height: "50px",
  color: "#fff",
  width: "100%",
  backgroundColor: "#10c44c",
  borderRadius: "10px",
  transition: ".3s linear",
};
const stylesDisabled = {
  height: "50px",
  color: "#ccc",
  width: "100%",
  backgroundColor: "#eee",
  borderRadius: "10px",
};
const stylesHover = {
  height: "50px",
  color: "#fff",
  width: "100%",
  backgroundColor: "#10a44c",
  borderRadius: "10px",
};
const BasketPage = () => {
  //const {} = useAppSelector((state) => state.page);
  const [list, setList] = useState(() => goods.filter((item) => item.count));
  const [checked, setChecked] = useState(false);
  const [sum, setSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const basket = [
    { name: <h2 className={classes.headerName}>Ваша корзина</h2>, value: "" },
    {
      name: (
        <div className={classes.goods}>
          Товары{" "}
          <div className={classes.name}>{`(${list.reduce((prev, current) => {
            if (current.choice && current.count) {
              return prev + current.count;
            }
            return prev;
          }, 0)})`}</div>
        </div>
      ),
      value: sum,
    },
    {
      name: <div className={classes.name}>Скидка</div>,
      value: (sum / 100) * 20,
    },
  ];
  const pay = [
    {
      name: (
        <div className={classes.name}>
          С <b>Magazin</b> картой
        </div>
      ),
      value: sum,
    },
    {
      name: (
        <div className={classes.name}>
          Без <b>Magazin</b> карты
        </div>
      ),
      value: sum * 1.7,
    },
  ];
  const obj = [basket, pay];
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
      <CardPageFlex>
        <>
          <h2>Корзина пуста</h2>
          <div className={classes.basketEmpty}>
            <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p> Если в
            корзине были товары –
            <Link to="../profile" className={classes.link}>
              войдите
            </Link>
            <p>, чтобы посмотреть список.</p>
          </div>
        </>
      </CardPageFlex>
    );
  }
  return (
    <CardPageFlex
      children={[
        <div className={classes.headerBasket}>
          <h2>Корзина</h2>
          <p>{`(${list.reduce((prev, current) => {
            if (current.count) {
              return prev + current.count;
            }
            return prev;
          }, 0)})`}</p>
        </div>,
        <>
          <BasketHeader />
          <div className={classes.line}></div>
          <GoodsList data={list} setList={setList} />
          {showModal && (
            <Modal
              title={"Удалить товары"}
              text={`Вы точно хотите удалить выбранные товары? Отменить данное действие будет невозможно.`}
              removeBasket={removeBasket}
            />
          )}
        </>,
        <CalculateAndRegisration
          sum={sum}
          obj={obj}
          title="Перейти к оформлению"
          styles={[styles, stylesHover, stylesDisabled]}
        />,
      ]}
      style={{ backgroundColor: "#fff",   padding: ".7rem" }}
    />
  );
};

export default BasketPage;
