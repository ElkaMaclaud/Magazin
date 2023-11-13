import React, { useState, useMemo, FC, MouseEvent } from "react";
import classes from "./style/PlacingAnOrder.module.css";
import { Currency } from "../../UI_Component/Icons";
import { Slider } from "../../UI_Component";
import { banksList } from "../../MockupData/banks";

interface BanksListProps {
  list: string[];
}
const BanksList: FC<BanksListProps> = ({ list }) => {
  return (
    <div className={classes.cardWrapper}>
      <h3>Способ оплаты</h3>
      <Slider list={list} />
      <div className={classes.footer}>
        <Currency /> <p>Скидка 214 ₽ при оплате Ozon Картой</p>
      </div>
    </div>
  );
};
const PlacingAnOrder: FC = () => {
  const [choice, setChoice] = useState("add");
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    if (value) {
      setChoice(value);
    }
  }
  const MemoizedBanksList = useMemo(() => <BanksList list={banksList} />, []);
  const ChoiceBlock: FC = () => {
    return (
      <div className={classes.cardWrapper}>
        <div className={classes.headerWrapper}>
          <h3>Баллы и бонусы</h3>
          <div className={classes.round}></div>
        </div>
        <div className={classes.radioWrapper}>
          <label htmlFor="add" className={classes.label}>
            <div
              className={
                choice === "use" ? classes.inputText : classes.inputTextActive
              }
              data-value="add"
              onClick={handleClick}
            >
              <input type="radio" value="add" />
              Начислить
            </div>
          </label>
          <label htmlFor="use" className={classes.label}>
            <div
              className={
                choice === "add" ? classes.inputText : classes.inputTextActive
              }
              data-value="use"
              onClick={handleClick}
            >
              <input type="radio" value="use" />
              Списать
            </div>
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.placingWrapper}>
      {MemoizedBanksList}
      <ChoiceBlock />
    </div>
  );
};

export default PlacingAnOrder;
