import React from "react";
import classes from "./style/AccountPage.module.css";
import { CardPageFlex } from "../../UI_Component";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/")
  }
  return (
    <CardPageFlex>
      <div
        onClick={handleClick}
        className={classes.accountWrapper}
      >
        Выйти из аккаунта
      </div>
    </CardPageFlex>
  );
};

export default AccountPage;
