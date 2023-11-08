import React, { forwardRef } from "react";
import classes from "./style/Dropdown.module.css";
import { menuItems } from "../../MockupData/menuItems";
import { Link } from "react-router-dom";

interface DropdownProps {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ setShowDropDown }, ref) => {
    const handleClick = () => {
      setShowDropDown(false);
    };

    return (
      <div ref={ref} className={classes.container}>
        <div className={classes.listContainer}>
          {menuItems.map((menu) => {
            const key = Math.random().toString(36).substring(2, 15);
            return (
              <div key={key} className={classes.list} onClick={handleClick}>
                <Link to={menu.link}  className={classes.listText} >{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Dropdown;
