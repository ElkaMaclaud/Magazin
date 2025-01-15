import React, { CSSProperties, FC } from "react";
import classes from "./style/PlacingAnOrder.module.css";
import { Currency } from "../../UI_Component/Icons";
import { banksList } from "../../MockupData/banks";
import { CardForInfo, Slider } from "../../UI_Component";
import MethodOfObtaining from "../MethodOfObtaining/MethodOfObtaining";
import ChoiceBlock from "../ChoiceBlock/ChoiceBlock";
import DeliveryDate from "../DeliveryDate/DeliveryDate";

interface BanksListProps {
  list: string[];
}
const style: CSSProperties = {objectFit: "cover"}
const BanksList: FC<BanksListProps> = ({ list }) => {
  return (
    <CardForInfo>
      <div className={classes.headerWrapper}><h3>Способ оплаты</h3></div>
      <Slider list={list} style={style} width={109} height={58} />
      <div className={classes.footer}>
        <Currency /> <p>Скидка 214 ₽ при оплате Ozon Картой</p>
      </div>
    </CardForInfo>
  );
};
const PlacingAnOrder: FC = () => {
  return (
    <div className={classes.placingWrapper}>
      <BanksList list={banksList} />
      <ChoiceBlock />
      <MethodOfObtaining/>
      <DeliveryDate />
    </div>
  );
};

export default PlacingAnOrder;
