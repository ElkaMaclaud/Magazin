import React, { FC, ReactNode, useState } from "react";
import classes from "./style/CounterButton.module.css";

export const CounterButton: FC<{
  text?: ReactNode;
  title?: string;
  handleClick: (increment: number) => void;
  counter: number;
}> = ({ text, title, handleClick, counter }) => {
  const [count, setCount] = useState(counter);
  const handler = (increment = 1) => {
    handleClick(increment);
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
