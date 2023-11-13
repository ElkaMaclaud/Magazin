import React, { useState, CSSProperties, FC, ReactNode } from "react";
import { Button, Card, InfoCard, SmallCard } from "../../UI_Component";
import classes from "./style/CalculateAndRegisration.module.css";
import { Link } from "react-router-dom";

const infoStyle: CSSProperties = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const CalculateAndRegisration: FC<{ sum: number; obj: {name: ReactNode; value: ReactNode}[][];  title: ReactNode; styles: CSSProperties[]}> = ({
  sum,
  obj,
  title,
  styles,
}) => {
  const [style, setStyle] = useState<CSSProperties>(styles[0]);

  if (sum === 0) {
    return (
      <SmallCard>
        <Button
          disabled={true}
          style={styles[2] || style}
          title={title}
        ></Button>
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
        <Link to="../placingAnOrderPage">
          <Button
            style={style}
            title={title}
            onMouseEnter={() => setStyle(styles[1])}
            onMouseLeave={() => setStyle(styles[0])}
          ></Button>
        </Link>
        <InfoCard>
            <p>
              Доступные способы и время доставки можно выбрать при оформлении
              заказа
            </p>
        </InfoCard>
        {obj.map((item) => {
          const key = Math.random().toString(36).substring(2, 15);
          console.log(key)
          return (
            <div key={key}>
              <div className={classes.line}></div>
              <Card obj={item} style={infoStyle}/>
            </div>
          );
        })}
      </SmallCard>
    </div>
  );
};

export default CalculateAndRegisration;
