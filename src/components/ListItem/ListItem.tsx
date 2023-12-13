import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from "./style/ListItem.module.css";
import { IListCategory } from "../../type/categoryType";
import { Link } from "react-router-dom";
import { keyGenerate } from "../../utils/keyGenerate";

const ListItem: FC<{ list: IListCategory[]; small?: boolean; setFoo?: Dispatch<SetStateAction<any>> }> = ({
  list,
  small,
  setFoo,
}) => {
  const [hover, setHover] = useState(list[0]);
  useEffect(() => {
    setFoo && setFoo(hover)
  }, [hover, setFoo])

  return (
    <ul className={small ? classes.wrapperListSmall : classes.wrapperList}>
      {list.map((item) => {
        const key = keyGenerate();
        return (
          <Link
          to={`../category/${item.link}`}
            onMouseOver={() => setHover(item)}
            key={key}
            className={
              small
                ? classes.itemSmall
                : hover === item
                ? classes.hoverItem
                : classes.item
            }
          >
            <div className={classes.itemInfo}>
              <div>{item.icon}</div>
              {item.name}
            </div>
            <span className={classes.arrow}></span>
          </Link>
        );
      })}
    </ul>
  );
};
export default ListItem;
