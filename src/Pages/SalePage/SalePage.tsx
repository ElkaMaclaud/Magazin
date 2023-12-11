import React, { useEffect } from "react";
import classes from "./style/SalePage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { GET_SALE_GOODS } from "../../store/slice";

const SalePage = () => {
  const { sale } = useAppSelector((state) => state.page.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_SALE_GOODS());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={classes.wrapper}>
      <h1>Успей приобрести товары по выгодной новогодней скидке!</h1>
        <GoodsList
          orientationVertical
          data={sale}
          icon="like"
        />
    </div>
  );
};

export default SalePage;


