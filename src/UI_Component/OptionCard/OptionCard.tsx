import React, { CSSProperties, FC, useState } from "react";
import classes from "./style/OptionCard.module.css";
import { СheckMark } from "../Icons";
export const OptionCard: FC<{
  value: string[];
  list: Array<Array<string>>;
  style?: CSSProperties;
  handleClick?: (arg: Array<string>) => void;
}> = ({ value, list, style, handleClick }) => {
  const [hover, setHover] = useState(list[0]);
  return (
    <div className={classes.wrapper} style={style}>
      {list.map((item) => {
        const key = Math.random().toString(36).substring(2, 15);
        return (
          <div
            onMouseOver={() => setHover(item)}
            style={hover===item ? {backgroundColor: "rgba(0, 91, 255, .1)"} : {}}
            key={key}
            onClick={handleClick ? () => handleClick(item) : () => null}
            className={
              value === item ? classes.optionActive : classes.option
            }
          >
            {item[1]}
            <СheckMark />
          </div>
        );
      })}
    </div>
  );
};
