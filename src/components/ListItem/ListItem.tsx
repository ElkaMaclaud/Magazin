import React, { FC, useState } from "react";
import classes from "./style/ListItem.module.css";
import { IListCategory } from "../../type/categoryType";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/reduxHooks";
import { GET_GOODS_BY_CATEGORY } from "../../store/slice";

const ListItem: FC<{ list: IListCategory[]; small?: boolean }> = ({
  list,
  small,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(list[0]);
  const handleClick = (link: string) => {
    if (link) {
      dispatch(GET_GOODS_BY_CATEGORY(link));
      navigate(`../category/${link}`);
    }
  };
  return (
    <ul className={small ? classes.wrapperListSmall : classes.wrapperList}>
      {list.map((item) => {
        const key = Math.random().toString(36).substring(2, 15);
        return (
          <li
            onMouseOver={() => setHover(item)}
            key={key}
            className={
              small
                ? classes.itemSmall
                : hover === item
                ? classes.hoverItem
                : classes.item
            }
            onClick={() => handleClick(item.link as string)}
          >
            <div className={classes.itemInfo}>
              <div>{item.icon}</div>
              {item.name}
            </div>
            <span className={classes.arrow}></span>
          </li>
        );
      })}
    </ul>
  );
};
export default ListItem;
