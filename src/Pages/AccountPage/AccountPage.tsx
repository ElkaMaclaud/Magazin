import React from "react";
import classes from "./style/AccountPage.module.css";
import { CardPageFlex } from "../../UI_Component";

const AccountPage = () => {
  return (
    <CardPageFlex>
      <div
        onClick={() => localStorage.removeItem("token")}
        className={classes.accountWrapper}
      >
        Выйти из аккаунта
      </div>
    </CardPageFlex>
  );
};

export default AccountPage;
