import React, { useEffect, useRef, CSSProperties } from "react";
import { Account } from "../../UI_Component/Icons";
import { Link } from "react-router-dom";
import classes from "./style/MenuLogin.module.css";
import InfoNoAvtorizetionPerson from "../InfoNoAvtorizetionPerson/InfoNoAvtorizetionPerson";
import { Modal } from "../Modal/Modal";
import { Login } from "../Login/Login";
import { useAppSelector } from "../../store/reduxHooks";
import { menuItems } from "../../MockupData/menuItems";
import MenuItem from "../MenuItem/MenuItem";
import { Dropdown } from "../../UI_Component";
import { useToggle } from "../../hooks/useToggle";

const MenuLogin = () => {
  const { data } = useAppSelector((state) => state.page);
  const [showModal, toggleShowModal] = useToggle(false);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");
  const handleMouseOver = () => {
    if (!showModal) {
      toggleShowDropDown();
    }
  };
  const handleMouseOut = (event: MouseEvent) => {
    if (!ref.current?.contains(event.relatedTarget as Node)) {
      // IE fromElement
      toggleShowDropDown();
    }
  };
  useEffect(() => {
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleActionNoAvtorization = () => {
    toggleShowModal();
    toggleShowDropDown();
  };
  const setStyle = (width = 250): CSSProperties => {
    const left = parentRef.current
      ? parentRef.current?.offsetLeft + parentRef.current?.clientWidth
      : null;
    const sub = token ? 19 : 7;
    return {
      width: `${width}px`,
      left: `${(left || 100) - width / 2 - sub}px`,
    };
  };
  if (token) {
    return (
      <div ref={parentRef} className={classes.menuWrapper}>
        <Link to="main" className={classes.link} onMouseOver={handleMouseOver}>
          <div className={classes.linkWrapperText}>
            <Account />
            {data.user.publik.name.split(" ")[0] || "Noname"}
          </div>
        </Link>
        {showDropDown && (
          <Dropdown ref={ref} style={setStyle()}>
            <MenuItem handleAction={toggleShowDropDown} list={menuItems} />
          </Dropdown>
        )}
      </div>
    );
  }
  return (
    <div ref={parentRef} className={classes.menuWrapper}>
      <div
        className={classes.link}
        onMouseOver={toggleShowDropDown}
        onClick={handleActionNoAvtorization}
      >
        <div className={classes.linkWrapperText}>
          <Account />
          Войти
        </div>
      </div>
      {showDropDown && (
        <Dropdown ref={ref} style={setStyle(300)}>
          <InfoNoAvtorizetionPerson handler={handleActionNoAvtorization} />
        </Dropdown>
      )}
      {showModal && (
        <Modal
          title="Magazin ID"
          content={<Login />}
          handleAction={toggleShowModal}
        />
      )}
    </div>
  );
};

export default MenuLogin;
