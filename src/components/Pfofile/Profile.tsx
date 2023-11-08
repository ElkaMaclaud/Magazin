import React from "react";
import { Card, InfoCard, TitleInfo } from "../../UI_Component";
import { Account, PublicInfo } from "../../UI_Component/Icons";
import classes from "./style/Pfofile.module.css";
import {
  personPrivateInfo,
  personPublicInfo,
} from "../../MockupData/personInfoData";

const Profile = () => {
  return (
    <div className={classes.profileWrapper}>
      <TitleInfo
        icon={<Account width="40" height="50" />}
        title={"Учётные данные"}
      />
      <InfoCard
        children={
          <>
            <p className={classes.text}>
              Вы можете менять свои личные данные, подтверждать почту, управлять
              аккаунтом и настройками безопасности в защищённом сервисе Magazin
            </p>
            <Card obj={personPrivateInfo} column={true} />
          </>
        }
      ></InfoCard>
      <TitleInfo
        icon={<PublicInfo width="40" height="50" />}
        title={"Публичные данные"}
      />
      <InfoCard
        children={
          <>
            <p className={classes.text}>
              Информация, которую вы укажете в этом разделе, публичная. Она
              указывается рядом с отзывами и видна другим пользователям сети
              Интернет. Размещая свои персональные данные в данном разделе, вы
              раскрываете их неопределенному кругу лиц.
            </p>
            <Card obj={personPublicInfo} />
          </>
        }
      ></InfoCard>
    </div>
  );
};

export default Profile;
