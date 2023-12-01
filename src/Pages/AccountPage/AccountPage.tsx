import React from "react";
import classes from "./style/AccountPage.module.css";
import { CardForInfo, CardPageFlex } from "../../UI_Component";
import ButtonRegistration from "../../components/ButtonRegistration/ButtonRegistration";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (<CardPageFlex><h1>Пока этой страницы не существует!!!</h1></CardPageFlex>)
  }
  return (
    <CardPageFlex>
      <CardForInfo>
        <div className={classes.wrapperAccountNoAvtorizated}>
          <h1>Войдите или Зарегистрируйтесь</h1>
          <p>
            Чтобы делать покупки, отслеживать заказы и пользоваться
            персональными скидками и баллами.
          </p>
          <Link to="/login"><ButtonRegistration children="Войти или зарегистрироваться"/></Link>
        </div>
      </CardForInfo>
    </CardPageFlex>
  );
};

export default AccountPage;
