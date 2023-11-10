import React, {useState, useEffect} from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import { goods } from "../../MockupData/goods";
import { useAppSelector } from "../../store/reduxHooks";
import classes from "./style/BasketPage.module.css";
import { SmallCard } from "../../UI_Component";
import CalculateAndRegisration from "../../components/CalculateAndRegisration/CalculateAndRegisration";

const BasketPage = () => {
  const {} = useAppSelector((state) => state.page);
  const [list, setList] = useState(goods.filter((item) => item.count))
  const [checked, setChecked] = useState(false);
  

  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapper}>
        <h2>Корзина</h2>
        <div className={classes.basketWrapper}>
          <div className={classes.basket}>
            <GoodsList data={goods.filter((item) => item.count)} />
          </div>
          <div className={classes.calculationRegistration}>
            <CalculateAndRegisration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
