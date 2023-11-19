import React, { CSSProperties, FC, forwardRef } from "react";
import classes from "./style/Dropdown.module.css";
import { IMenuItems } from "../../MockupData/menuItems";
import { Link } from "react-router-dom";

interface DropdownProps {
  list: IMenuItems[] | string[];
  handleAction: () => void;
  style?: CSSProperties;
  after?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({  list, handleAction, style, after }, ref) => {
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
      <div ref={ref} className={after ? classes.containerAfter : classes.container} style={style}>
        <div className={classes.listContainer}>
          {list.map((menu: string | IMenuItems) => {
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
      </div>
    );
  }
);

export default Dropdown;
