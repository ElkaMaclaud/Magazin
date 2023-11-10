import React, { useState, CSSProperties, FC } from "react";
import { Button, Card, InfoCard, SmallCard } from "../../UI_Component";
import classes from "./style/CalculateAndRegisration.module.css";
const styles = {
  height: "50px",
  color: "#fff",
  width: "100%",
  backgroundColor: "#10c44c",
  borderRadius: "10px",
  transition: ".3s linear",
};
const stylesDisabled = {
  height: "50px",
  color: "#ccc",
  width: "100%",
  backgroundColor: "#eee",
  borderRadius: "10px",
};
const stylesHover = {
  height: "50px",
  color: "#fff",
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
const CalculateAndRegisration: FC<{ sum: number; countGood: number }> = ({ sum, countGood }) => {
  const [style, setStyle] = useState<CSSProperties>(styles);
  const basket = [
    { name: <div className={classes.goods}>Товары <div>{`(${countGood})`}</div></div>, value: sum },
    { name: "Скидка", value: (sum / 100) * 20 },
  ];
  const pay = [
    { name: "С Magazin картой", value: sum },
    { name: "Без Magazin карты", value: sum * 1.7 },
  ];
  const obj = [basket, pay];
  if (sum === 0) {
    return (
      <SmallCard>
        <Button
          disabled={true}
          style={stylesDisabled}
          title="Перейти к оформлению"
        ></Button>
        <InfoCard
          children={
            <div className={classes.textWrapper}>
              <div className={classes.round}></div>
              <p className={classes.text}>
                Выберите товары, чтобы перейти к оформлению заказа
              </p>
            </div>
          }
        ></InfoCard>
      </SmallCard>
    );
  }
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
        {obj.map((item, index) => {
          const key = Math.random().toString(36).substring(2, 15);
          return (
            <div key={key}>
              <div className={classes.line}></div>
              {index === 0 && <h3>Ваша корзина</h3>}
              <Card obj={item} style={infoStyle}></Card>
            </div>
          );
        })}
      </SmallCard>
    </div>
  );
};

export default CalculateAndRegisration;
