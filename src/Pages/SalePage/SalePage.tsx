import React from "react";
import classes from "./style/SalePage.module.css";
import { useAppSelector } from "../../store/reduxHooks";
import { Link } from "react-router-dom";
import { ImageGood } from "../../UI_Component";

const SalePage = () => {
  const { sale } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.wrapper}>
      <h1>Успей приобрести товары по выгодной новогодней скидке!</h1>
      <div className={classes.saleWrapper}>
        {sale?.map((item) => {
          const key = Math.random().toString(36).substring(2, 15);
          return (
            <Link to={`../good/${item.id}`} key={key}>
              <ImageGood path={item.image} size={window.innerWidth / 5 - 20} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SalePage;
