import React from "react";
import classes from "./style/PersonalPage.module.css";
import { CardForInfo, CardPageFlex } from "../../UI_Component";
import ButtonRegistration from "../../components/ButtonRegistration/ButtonRegistration";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { accountList } from "../../MockupData/categoryFilter";
import ListItem from "../../components/ListItem/ListItem";

const PersonalPage = () => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name")
  if (token) {
    return (
      <CardPageFlex>
        {" "}
        <div className={classes.contentWrapper}>
          <div className={classes.sideBar}>
            <SideBar>
              <>
                <UserAvatar name={name || ""} />
                <ListItem list={accountList} small />
              </>
            </SideBar>
          </div>
        </div>
      </CardPageFlex>
    );
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
          <Link to="/login">
            <ButtonRegistration children="Войти или зарегистрироваться" />
          </Link>
        </div>
      </CardForInfo>
    </CardPageFlex>
  );
};

export default PersonalPage;
