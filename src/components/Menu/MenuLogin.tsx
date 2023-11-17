import React, { useState, useEffect, useRef } from "react";
import { Account } from "../../UI_Component/Icons";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./style/MenuLogin.module.css";

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
      {showDropDown && <Dropdown setShowDropDown={setShowDropDown} ref={ref} />}
    </div>
  );
};

export default MenuLogin;
