import React, { FC, ReactNode, useState } from "react";
import classes from "./style/CounterButton.module.css";
import { useAppDispatch } from "../../store/reduxHooks";
import { ADD_BASKET_OF_GOODS, DECREMENT_BASKET_OF_GOODS } from "../../store/slice";

export const CounterButton: FC<{
  text?: ReactNode;
  title?: string;
  id: string;
  counter: number;
}> = ({ text, title, id, counter }) => {
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(counter);
  const addBasket = (increment: number) => {
    if (increment > 0) {
      dispatch(ADD_BASKET_OF_GOODS(id));
    } else {
      dispatch(DECREMENT_BASKET_OF_GOODS(id));
    }
  };
  const handler = (increment = 1) => {
    addBasket(increment)
    setCount((prev) => prev + increment);
  };
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
    <div className={classes.wrapperCount}>
      {text && <div>{text}</div>}
      <BaksetCount />
    </div>
  );
};
