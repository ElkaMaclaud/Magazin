import React, { useState, CSSProperties, ReactNode } from "react";
import { Button, Card, InfoCard, SmallCard } from "../../UI_Component";
import classes from "./style/CalculateAndRegisration.module.css";
const styles = {
  width: "100%",
  backgroundColor: "#10c44c",
  borderRadius: "10px",
  transition: ".3s linear",
};
const stylesHover = {
  width: "100%",
  backgroundColor: "#10a44c",
  borderRadius: "10px",
};
const infoStyle: CSSProperties = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const CalculateAndRegisration = () => {
  const [style, setStyle] = useState<CSSProperties>(styles);
  const basket = { Товары: 162754, Скидка: 657 };
  const pay = {"С Magazin картой": 67587, "Без Magazin карты": 87676}
  const obj: { [key: string]: { [key: string]: ReactNode } } = {"1": basket, "2": pay}
  return (
    <div className={classes.wrapper}>
      <SmallCard>
        <Button
          style={style}
          title="Перейти к оформлению"
          onMouseEnter={() => setStyle(stylesHover)}
          onMouseLeave={() => setStyle(styles)}
        ></Button>
        <InfoCard
          children={
            <p className={classes.text}>
              Доступные способы и время доставки можно выбрать при оформлении
              заказа
            </p>
          }
        ></InfoCard>
      {Object.keys(obj).map((item) => {
        const key = Math.random().toString(36).substring(2, 15);
        return (
          <div key={key}>
            <div className={classes.line}></div>
            {item === "1" && <h3>Ваша корзина</h3>}
            <Card obj={obj[item]} style={infoStyle}></Card>
          </div>
        )
      })}
      </SmallCard>
    </div>
  );
};

export default CalculateAndRegisration;
