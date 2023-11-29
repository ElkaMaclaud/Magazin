import React, { useState } from "react";
import { Card, InfoCard, TitleInfo } from "../../UI_Component";
import { Account, PublicInfo } from "../../UI_Component/Icons";
import classes from "./style/SettingsPage.module.css";
import { useAppSelector } from "../../store/reduxHooks";
import { CountryFromCoordinates } from "../../utils/getCountryFromCoordinates";
import { getFormatDate } from "../../utils/farmatDate";
import SideBar from "../../components/SideBar/SideBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";


const SettingsPage = () => {
  const [localization, setLocalizayion] = useState<any>()
  const {user} = useAppSelector(state => state.page.data)
  const exampleUsage = () => {
    CountryFromCoordinates()
      .then((locationInfo) => {
        anotherFunction(locationInfo);
      })
      .catch((error) => {
        console.error('Произошла ошибка:', error);
      });
  };
  
  const anotherFunction = (locationData: any) => {
    setLocalizayion(locationData)
  };
  
  exampleUsage();
  const getFullYear = () => {
    if (user.private.dateOfBirt) {
      const diff = new Date().getTime() - new Date(user.private.dateOfBirt).getTime()
      const year = new Date (diff).getUTCFullYear() - 1970
      return year
    }
  }
  const personPrivateInfo = [
    { name: "ФИО", value: `${user.private.name}` },
    { name: "Телефон", value: `${user.private.phone || ""}` },
    { name: "Дата Рождения", value: `${getFormatDate(user.private.dateOfBirt) || ""}` },
    { name: "Почта", value: `${user.private.email}` },
    { name: "Пол", value: `${user.private.gender || ""}` },
  ];
  const personPublicInfo = [
    { name: "ФИО", value: `${user.publik.name}` },
    { name: "Страна, город", value: `${localization}` },
    { name: "Возраст", value: `${getFullYear() || ""}` },
  ];
  return (
    <div className={classes.contentWrapper}> <div className={classes.sideBar}>
  <SideBar>
    <UserAvatar name={user.private.name} />
  </SideBar>
</div>
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
          <Card obj={personPrivateInfo} column />
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
  </div></div>
  );
};

export default SettingsPage;
