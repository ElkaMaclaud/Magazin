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
  const [hover, setHover] = useState(list[0])
  const handleClick = (link: string) => {
    if (link) {
      dispatch(GET_GOODS_BY_CATEGORY(link));
      navigate(`../category/${link}`);
    }
  };
  return (
    <div className={small ? classes.wrapperListSmall : classes.wrapperList}>
      {list.map((item) => {
        const key = Math.random().toString(36).substring(2, 15);
        return (
          <div
            onMouseOver={() => setHover(item)}
            style={
              hover === item ? { backgroundColor: "rgba(0, 91, 255, .1)" } : {}
            }
            key={key}
            className={small ? classes.itemSmall : classes.item}
            onClick={() => handleClick(item.link as string)}
          >
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
export default ListItem;
