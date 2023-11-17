import React, { FC, ReactNode, useState } from "react";
import classes from "./style/CounterButton.module.css";

export const CounterButton: FC<{ text?: ReactNode; title?: string; handleClick: (id: string, increment: number) => void; id: string; counter: number}> = ({
  text,
  title,
  handleClick,
  id,
  counter,
}) => {
  const [count, setCount] = useState(counter);
  const handler = (id: string, increment=1) => {
    handleClick(id, increment);
    setCount((prev) => prev+=increment)
  }
  const BaksetCount = () => {
    if (count) {
      return (
        <div className={classes.buttonGroop}>
          <button className={classes.littleButton} onClick={() => handler(id, -1)} disabled={!text && count === 1}>-</button>
          <span>{count}</span>
          <button className={classes.littleButton} onClick={() => handler(id)}>+</button>
        </div>
      );
    }
    return <button className={classes.button} onClick={() => handler(id)}>{title}</button>;
  };

  return (
    <div className={classes.wrapperCount}>
      {text && <div>{text}</div>}
      <BaksetCount />
    </div>
  );
};
