import React, { CSSProperties, FC, ReactNode } from "react";
import { Button, Card, InfoCard, SmallCard } from "../../UI_Component";
import classes from "./style/CalculateAndRegisration.module.css";

const infoStyle: CSSProperties = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const CalculateAndRegisration: FC<{
  sum: number;
  obj: { name: ReactNode; value: ReactNode }[][];
  title: ReactNode;
  stylesForButton: CSSProperties[];
  handler: (...args: any) => void;
}> = ({ sum, obj, title, stylesForButton, handler }) => {
  if (sum === 0) {
    return (
      <SmallCard>
        <Button disabled styles={stylesForButton}>
          {title}
        </Button>
        <InfoCard>
          <div className={classes.textWrapper}>
            <div className={classes.round}></div>
            <p className={classes.text}>
              Выберите товары, чтобы перейти к оформлению заказа
            </p>
          </div>
        </InfoCard>
      </SmallCard>
    );
  }
  return (
    <div className={classes.wrapper}>
      <SmallCard>
        <Button onClick={handler} styles={stylesForButton}>
          {title}
        </Button>
        <InfoCard>
          <p>
            Доступные способы и время доставки можно выбрать при оформлении
            заказа
          </p>
        </InfoCard>
        {obj.map((item) => {
          const key = Math.random().toString(36).substring(2, 15);
          return (
            <div key={key}>
              <div className={classes.line}></div>
              <Card obj={item} style={infoStyle} />
            </div>
          );
        })}
      </SmallCard>
    </div>
  );
};

export default CalculateAndRegisration;
