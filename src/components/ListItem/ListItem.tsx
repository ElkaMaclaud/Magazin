import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from "./style/ListItem.module.css";
import { IListCategory } from "../../type/categoryType";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/reduxHooks";
import { GET_GOODS_BY_CATEGORY } from "../../store/slice";
import { keyGenerate } from "../../utils/keyGenerate";

const ListItem: FC<{ list: IListCategory[]; small?: boolean; setFoo?: Dispatch<SetStateAction<any>> }> = ({
  list,
  small,
  setFoo,
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
  useEffect(() => {
    setFoo && setFoo(hover)
  }, [hover, setFoo])

  return (
    <ul className={small ? classes.wrapperListSmall : classes.wrapperList}>
      {list.map((item) => {
        const key = keyGenerate();
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
