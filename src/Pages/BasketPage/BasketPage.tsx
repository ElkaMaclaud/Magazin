import React, { useState, useEffect, ChangeEvent } from "react";
import classes from "./style/BasketPage.module.css";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";
import { Link, useNavigate } from "react-router-dom";
import { Share, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../../components/Modal/Modal";
import { CardPageFlex } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { CHOICE_ALL_BASKET_OF_GOODS, CLEARANCE_OF_GOODS, REMOVE_CHOICES_BASKET_OF_GOODS } from "../../store/slice";
import GoodsList from "../../components/GoodsList/GoodsList";

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
  const { basket } = useAppSelector((state) => state.page.data.user);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [sum, setSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const basketOfGoods = [
    { name: <h2 className={classes.headerName}>Ваша корзина</h2>, value: "" },
    {
      name: (
        <div className={classes.goods}>
          Товары
          <div className={classes.name}>{`(${basket.reduce((prev, current) => {
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
  const obj = [basketOfGoods, pay];
  useEffect(() => {
    if (basket.filter((item) => item.choice).length === basket.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setSum(
      basket.reduce((prev, current) => {
        if (current.choice && current.count) {
          return prev + current.count * current.price;
        }
        return prev;
      }, 0)
    );
  }, [basket]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    dispatch(CHOICE_ALL_BASKET_OF_GOODS(e.target.checked))
  };
  const removeChoiceGoods = () => {
    setShowModal(true);
  };
  const removeBasket = (remove = true) => {
    if (remove) {
      dispatch(REMOVE_CHOICES_BASKET_OF_GOODS())
    }
    setShowModal(false);
  };
  const handleCalculateGoods = () => {
    dispatch(CLEARANCE_OF_GOODS())
    navigate("../placingAnOrderPage")
  }
  const BasketHeader = () => {
    if (basket.filter((item) => item.choice).length) {
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
            <p>Выбрать все </p>
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
          <p>Выбрать все </p>
        </div>
      </div>
    );
  };

  if (basket.length === 0) {
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
          <p>{`(${basket.reduce((prev, current) => {
            if (current.count) {
              return prev + current.count;
            }
            return prev;
          }, 0)})`}</p>
        </div>,
        <>
          <BasketHeader />
          <div className={classes.line}></div>
          <GoodsList data={basket} />
          {showModal && (
            <Modal
              title={"Удалить товары"}
              content={`Вы точно хотите удалить выбранные товары? Отменить данное действие будет невозможно.`}
              buttonText="Удалить"
              handleAction={removeBasket}
            />
          )}
        </>,
        <CalculateAndRegisration
          handler={handleCalculateGoods}
          sum={sum}
          obj={obj}
          title="Перейти к оформлению"
          stylesForButton={[styles, stylesHover, stylesDisabled]}
        />,
      ]}
      style={{ backgroundColor: "#fff", padding: ".7rem" }}
    />
  );
};

export default BasketPage;
