import React from "react";
import classes from "./style/AccountPage.module.css";
import { CardForInfo, CardPageFlex } from "../../UI_Component";
import ButtonRegistration from "../../components/ButtonRegistration/ButtonRegistration";
const AccountPage = () => {
  return (
    <CardPageFlex>
      <CardForInfo>
        <div className={classes.wrapperAccountNoAvtorizated}>
          {" "}
          <h1>Войдите или Зарегистрируйтесь</h1>
          <p>
            Чтобы делать покупки, отслеживать заказы и пользоваться
            персональными скидками и баллами.{" "}
          </p>
          <ButtonRegistration title="Войти или зарегистрироваться"/>
        </div>
      </CardForInfo>
    </CardPageFlex>
  );
};

export default AccountPage;
