import React, { FC } from "react";
import classes from "./style/ListItem.module.css";
import { IListCategory } from "../../type/categoryType";

export const ListItem: FC<{ list: IListCategory[] }> = ({ list }) => {
  return (
    <div className={classes.wrapperList}>
      {list.map((item) => {
        return (
          <div key={item.name} className={classes.item}>
            <div className={classes.itemInfo}>
              <div>{item.icon}</div>
              <div>{item.name}</div>
            </div>
            <span className={classes.arrow}></span>
          </div>
        );
      })}
    </div>
  );
};
