import React, { CSSProperties, FC, useEffect, useState } from "react";
import classes from "./style/CounterButton.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { ADD_TO_CARD_OF_GOODS, ADD_TO_CARD_OF_GOODS__NO_AUTO, SUBTRACT_FROM_CART } from "../../store/slice";

export const CounterButton: FC<{
  text?: number;
  title?: string;
  id: string;
  counter: number;
  style?: CSSProperties,
}> = ({ text, title, id, counter, style }) => {
  const { token } = useAppSelector(state => state.page)
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(counter);
  const addcart = (increment: number) => {
    if (increment > 0) {
      if (token) {
        dispatch(ADD_TO_CARD_OF_GOODS(id));   
      } else {
        dispatch(ADD_TO_CARD_OF_GOODS__NO_AUTO(id)); 
      }  
    } else {
      dispatch(SUBTRACT_FROM_CART(id));
    }
  };
  const handler = (increment = 1) => {
    addcart(increment)
    setCount((prev) => prev + increment);
  };
  useEffect(() => {
    setCount(counter);
  }, [counter])
  const BaksetCount = () => {
    if (count) {
      return (
        <div className={classes.buttonGroop}>
          <button
            className={classes.littleButton}
            onClick={() => handler(-1)}
            disabled={!text && count === 1}
          >
            -
          </button>
          <span>{count}</span>
          <button className={classes.littleButton} onClick={() => handler()}>
            +
          </button>
        </div>
      );
    }
    return (
      <button className={classes.button} onClick={() => handler()}>
        {title}
      </button>
    );
  };

  return (
    <div className={classes.wrapperCount} style={style}>
      {text && <div>{text * (count > 0 ? count : 1)}</div>}
      <BaksetCount />
    </div>
  );
};
