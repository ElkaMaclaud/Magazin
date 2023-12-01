import React, { FC } from "react";
import classes from "./style/ListItem.module.css";
import { IListCategory } from "../../type/categoryType";

export const ListItem: FC<{ list: IListCategory[]; small?: boolean }> = ({ list, small }) => {
  return (
    <div className={small ? classes.wrapperListSmall : classes.wrapperList}>
      {list.map((item) => {
        const key = Math.random().toString(36).substring(2, 15);
        return (
          <div key={key} className={small ? classes.itemSmall : classes.item}>
            <div className={classes.itemInfo}>
              <div>{item.icon}</div>
              {item.name}
            </div>
            <span className={classes.arrow}></span>
          </div>
        );
      })}
    </div>
  );
};
