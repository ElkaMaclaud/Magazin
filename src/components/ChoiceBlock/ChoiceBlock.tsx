import React, { FC, MouseEvent, useState } from "react";
import { CardForInfo } from "../../UI_Component";
import classes from "./style/ChoiceBlock.module.css";
import { Modal } from "../Modal/Modal";
const ChoiceBlock: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [choice, setChoice] = useState("add");
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    if (value) {
      setChoice(value);
    }
  };
  return (
    <CardForInfo>
      <div className={classes.headerWrapper}>
        <h3>Баллы и бонусы</h3>
        <div
          className={classes.roundWrapper}
          onClick={() => setShowModal(true)}
        >
          <div className={classes.round}></div>
        </div>
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
      {showModal && (
        <Modal
          title={"Копите бонусы продавца, а затем тратьте при оплате заказа"}
          content={`
            Эти бонусы вы сможете потратить на будущие покупки у этого же продавца и сэкономить до 25% стоимости заказа. Найти информацию о своем бонусном балансе вы можете в личном кабинете.
            За покупки товаров на Ozon больше не начисляются Premium-баллы. Все накопленные ранее баллы доступны на вашем балансе для оплаты заказов.`}
          handleAction={() => setShowModal(false)}
          buttonText={"Понятно"}
        />
      )}
    </CardForInfo>
  );
};
export default ChoiceBlock;
