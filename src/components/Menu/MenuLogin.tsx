import React, { useState, useEffect, useRef } from "react";
import { Account } from "../../UI_Component/Icons";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

const MenuLogin = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    setShowDropDown(true);
  };

  const handleMouseOut = (event: MouseEvent) => {
    if (!ref.current?.contains(event.relatedTarget as Node)) { // IE fromElement
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
    <>
      <div onMouseOver={handleMouseOver}>
        <Link to={"catalog"}>
          <Account width={"60"} height={"60"} />
        </Link>
      </div>
      {showDropDown && <Dropdown setShowDropDown={setShowDropDown} ref={ref} />}
    </>
  );
};

export default MenuLogin;