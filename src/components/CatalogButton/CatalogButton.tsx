import React, { FC } from "react";
import classes from "./style/CatalogButton.module.css";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { PAGE_POSITION } from "../../store/slice";
import { Burger, Cross } from "../../UI_Component/Icons";

const CatalogButton: FC<{
  text: string;
}> = ({ text }) => {
  const { pagePostion } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  if (pagePostion === "CHOICE_CATEGORY") {
    return (
      <div
        className={classes.btnActive}
        onClick={() => dispatch(PAGE_POSITION("MAIN"))}
      >
        <Cross />
        {text}
      </div>
    );
  }
  return (
    <div
      className={classes.button}
      onClick={() => dispatch(PAGE_POSITION("CHOICE_CATEGORY"))}
    >
      <Burger /> {text}
    </div>
  );
};

export default CatalogButton;
