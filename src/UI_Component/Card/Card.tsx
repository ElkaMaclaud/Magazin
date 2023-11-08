import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Card.module.css";

export const Card: FC<{
  obj: { [key: string]: ReactNode };
  child?: ReactNode;
  column?: boolean;
  style?: CSSProperties;
}> = ({ obj, child, column, style }) => {
  const isColumn = column ? "column" : "row";
  const maxHeight = () => {
    return Math.ceil((Object.keys(obj).length * 71) / 2) + 60;
  };
  const styleCard: CSSProperties = {
    flexDirection: isColumn,
    maxHeight: maxHeight(),
  };
  return (
    <div style={styleCard} className={classes.cardWrappper}>
      {Object.keys(obj).map((key: keyof typeof obj) => {
        return (
          <div key={key} className={classes.infoWrapper} style={style}>
            <div>{key}{child}</div>
            <h3>{obj[key]}</h3>
          </div>
        );
      })}
    </div>
  );
};
