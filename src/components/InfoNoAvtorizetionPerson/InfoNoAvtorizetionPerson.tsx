import React, { FC } from "react";
import ButtonRegistration from "../ButtonRegistration/ButtonRegistration";
import classes from "./style/InfoNoAvtorizetionPerson.module.css";

const InfoNoAvtorizetionPerson: FC<{handler: (...args: any) => any}> = ({handler}) => {
  return (
    <div className={classes.wrapperdropDown}>
      <p>
        Войдите, чтобы делать покупки, отслеживать заказы и пользоваться
        персональными скидками и баллами. После входа вы сможете создать аккаунт
        юрлица.
      </p>
      <ButtonRegistration
        handler={handler}
      >Войти или зарегистрироваться</ButtonRegistration>
      <ButtonRegistration
        backgroundColor="rgba(12, 32, 49, 0.08)"
        backgroundColorHover="rgba(90, 126, 151, 0.08)"
      >Личный кабинет</ButtonRegistration>
    </div>
  );
};

export default InfoNoAvtorizetionPerson;
