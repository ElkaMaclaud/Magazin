import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Card.module.css";
import { keyGenerate } from "../../utils/keyGenerate";

export const Card: FC<{
  obj: { name: ReactNode, value: ReactNode }[];
  column?: boolean;
  style?: CSSProperties;
}> = ({ obj, column, style }) => {
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
      {obj.map((item) => {
        const key = keyGenerate();
        return (
          <div key={key} className={classes.infoWrapper} style={style}>
            <div>{item.name}</div>
            <h3>{item.value}</h3>
          </div>
        );
      })}
    </div>
  );
};
