import React, { useState, useEffect } from "react";
import classes from "./style/CartPage.module.css";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";
import { Link, useNavigate } from "react-router-dom";
import { Share, СheckMark } from "../../UI_Component/Icons";
import { Modal } from "../../components/Modal/Modal";
import { CardPageFlex } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import {
  SELECT_ALL_ITEMS_IN_CART,
  GET_CART_OF_GOODS,
  REMOVE_SELECTED_ITEMS_FROM_CART,
} from "../../store/slice";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useToggle } from "../../hooks/useToggle";
import Spinner from "../../components/Spinner/Spinner";

const styles = {
  height: "50px",
  color: "#fff",
  width: "100%",
  backgroundColor: "#10c44c",
  transition: ".3s linear",
};
const stylesDisabled = {
  height: "50px",
  color: "#ccc",
  width: "100%",
  backgroundColor: "#eee",
};
const stylesHover = {
  height: "50px",
  color: "#fff",
  width: "100%",
  backgroundColor: "#10a44c",
};
const CartPage = () => {
  const { data, isloading } = useAppSelector((state) => state.page);
  const { cart } = data.user
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [sum, setSum] = useState(0);
  const [showModal, toggleShowModal] = useToggle(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(GET_CART_OF_GOODS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cartOfGoods = [
    { name: <h2 className={classes.headerName}>Ваша корзина</h2>, value: "" },
    {
      name: (
        <div className={classes.goods}>
          Товары
          <div className={classes.name}>{`(${cart.reduce((prev, current) => {
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
  const obj = [cartOfGoods, pay];
  useEffect(() => {
    if (cart.filter((item) => item.choice).length === cart.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    setSum(
      cart.reduce((prev, current) => {
        if (current.choice && current.count) {
          return prev + current.count * current.price;
        }
        return prev;
      }, 0)
    );
  }, [cart]);
  const onChange = () => {
    setChecked(!checked);
    dispatch(SELECT_ALL_ITEMS_IN_CART(!checked));
  };
  const removeChoiceGoods = () => {
    toggleShowModal();
  };
  const removecart = (remove = true) => {
    if (remove) {
      dispatch(REMOVE_SELECTED_ITEMS_FROM_CART());
    }
    toggleShowModal();
  };
  const shareShoppingartCart = () => {
    toggleShowModal();
  };
  const handleCalculateGoods = () => {
    navigate("../placingAnOrderPage");
  };
  const CartHeader = () => {
    if (cart.filter((item) => item.choice).length) {
      return (
        <div className={classes.cartHeaderWrapper}>
          <div className={classes.cartHeaderWrapperchild}>
            <label htmlFor="checkbox" className={classes.inputWrapper}>
              <input
                type="checkbox"
                id="checkbox"
                onChange={onChange}
                checked={checked}
              />
              <div className={classes.checkHover}>
                <СheckMark />
              </div> Выбрать все
            </label>
            <p onClick={removeChoiceGoods}>Удалить выбранные</p>
          </div>
          <div className={classes.cartHeaderWrapperchild} onClick={shareShoppingartCart}>
            <Share />
            <p>Поделиться</p>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.cartHeaderWrapper}>
        <div className={classes.cartHeaderWrapperchild}>
          <label htmlFor="checkbox" className={classes.inputWrapper}>
            <input
              type="checkbox"
              id="checkbox"
              onChange={onChange}
              checked={checked}
            />
            <div className={classes.checkHover}>
              <СheckMark />
            </div> Выбрать все
          </label>
        </div>
      </div>
    );
  };
  if (isloading) {
    return (
      <CardPageFlex>
        <>
        <Spinner />
        </>
      </CardPageFlex>
    );
  } 
  if (cart.length === 0) {
    return (
      <CardPageFlex>
        <>
          <h2>Корзина пуста</h2>
          <div className={classes.cartEmpty}>
            <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p> Если в
            корзине были товары –
            <Link to="../main" className={classes.link}>
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
        <div className={classes.headercart}>
          <h2>Корзина</h2>
          <p>{`(${cart.reduce((prev, current) => {
            if (current.count) {
              return prev + current.count;
            }
            return prev;
          }, 0)})`}</p>
        </div>,
        <>
          <CartHeader />
          <div className={classes.line}></div>
          <GoodsList data={cart} />
          {showModal && (
            <Modal
              title={"Удалить товары"}
              content={`Вы точно хотите удалить выбранные товары? Отменить данное действие будет невозможно.`}
              buttonText="Удалить"
              handleAction={removecart}
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

export default CartPage;
