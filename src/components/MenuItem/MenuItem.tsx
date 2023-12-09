import React, { FC } from "react";
import classes from "./style/MenuItem.module.css";
import { Link } from "react-router-dom";
import { IMenuItems } from "../../MockupData/menuItems";

const MenuItem: FC<{ handleAction: (...args: any) => void;
    list?: IMenuItems[] | string[];}> = ({handleAction, list}) => {
    const handleClick = () => {
         handleAction();
      };
      const checkPropsType = (prop: string | IMenuItems): prop is string => {
        return typeof prop === "string";
      };
    const ChilContent: FC<{
        link: string | null;
        name: string | null;
        menu: string | IMenuItems;
      }> = ({ link, name, menu }) => {
        if (link && name) {
          return (
            <Link to={link} className={classes.listText}>
              {name}
            </Link>
          );
        } else if (checkPropsType(menu)) {
          return <div className={classes.listText}>{menu}</div>;
        }
        return null;
      };
  return (
      <div className={classes.listContainer}>
        {list &&
          list.map((menu: string | IMenuItems) => {
            const key = Math.random().toString(36).substring(2, 15);
            const link = !checkPropsType(menu) ? menu.link : null;
            const name = !checkPropsType(menu) ? menu.name : null;
            return (
              <div key={key} className={classes.list} onClick={handleClick}>
                <ChilContent link={link} name={name} menu={menu} />
              </div>
            );
          })}
      </div>
  );
};

export default MenuItem;
