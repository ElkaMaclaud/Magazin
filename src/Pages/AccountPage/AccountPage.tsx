import React from "react";
import classes from "./style/AccountPage.module.css";
import { CardPageFlex } from "../../UI_Component";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/reduxHooks";
import { SET_LOGOUT } from "../../store/slice";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(SET_LOGOUT())
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
