import React, { useState, useEffect, useRef } from "react";
import { Account } from "../../UI_Component/Icons";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./style/MenuLogin.module.css";
import { menuItems } from "../../MockupData/menuItems";

const MenuLogin = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    setShowDropDown(true);
  };

  const handleMouseOut = (event: MouseEvent) => {
    if (!ref.current?.contains(event.relatedTarget as Node)) {
      // IE fromElement
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);
  const handleAction = () => {
    setShowDropDown(false);
  }
  return (
    <div  className={classes.menuWrapper}>
      <Link
        to={"catalog"}
        className={classes.link}
        onMouseOver={handleMouseOver}
      >
        <div className={classes.linkWrapperText}>
          <Account />
          Аккаунт
        </div>
      </Link>
      {showDropDown && <Dropdown handleAction={handleAction} ref={ref} list={menuItems}/>}
    </div>
  );
};

export default MenuLogin;
