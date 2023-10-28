import React, { CSSProperties, FC } from "react";
import classes from "./style/Card.module.css";

export const Card: FC<{ obj: { [key: string]: string }; column?: boolean }> = ({
  obj,
  column,
}) => {
  const isColumn = column ? "column" : "row";
  const maxHeight = () => {
    return Math.ceil((Object.keys(obj).length * 71) / 2) + 60;
  };
  const style: CSSProperties = {
    display: "flex",
    flexDirection: isColumn,
    maxHeight: maxHeight(),
  };
  console.log(obj);
  return (
    <div style={style} className={classes.cardWrappper}>
      {Object.keys(obj).map((key: keyof typeof obj) => {
        return (
          <div key={key} className={classes.infoWrapper}>
            <p>{key}</p>
            <h3>{obj[key]}</h3>
          </div>
        );
      })}
    </div>
  );
};
