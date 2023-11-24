import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { Account } from "../../UI_Component/Icons";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import classes from "./style/MenuLogin.module.css";
import InfoNoAvtorizetionPerson from "../InfoNoAvtorizetionPerson/InfoNoAvtorizetionPerson";
import { Modal } from "../Modal/Modal";
import { Login } from "../Login/Login";
import { useAppSelector } from "../../store/reduxHooks";
import { menuItems } from "../../MockupData/menuItems";
const style: CSSProperties = { width: "300px", left: "59.5%" };
const MenuLogin = () => {
  const {token, data} = useAppSelector(state => state.page)
  const [showModal, setShowModal] = useState(false);
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
  };
  const handleActionNoAvtorization = () => {
    setShowModal(true);
    setShowDropDown(false);
  };
  if (token) {
     return (
    <div  className={classes.menuWrapper}>
      <Link
        to={"accountPage"}
        className={classes.link}
        onMouseOver={handleMouseOver}
      >
        <div className={classes.linkWrapperText}>
          <Account />
          {data.user.publik.name.split(" ")[0]}
        </div>
      </Link>
      {showDropDown && <Dropdown handleAction={handleAction} ref={ref} list={menuItems}/>}
    </div>
  );
  }
  return (
    <div className={classes.menuWrapper}>
      <Link
        to={"accountPage"}
        className={classes.link}
        onMouseOver={handleMouseOver}
      >
        <div className={classes.linkWrapperText}>
          <Account />
          Войти
        </div>
      </Link>
      {showDropDown && (
        <Dropdown handleAction={handleActionNoAvtorization} ref={ref} style={style}>
          <InfoNoAvtorizetionPerson handler={handleActionNoAvtorization}/>
        </Dropdown>
      )}
      {showModal && <Modal  title="Magazin ID"
          content={<Login />}
          handleAction={() => setShowModal(false)}/>}
    </div>
  );
};

export default MenuLogin;
