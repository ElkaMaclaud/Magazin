import React, { FC, ReactNode, memo } from "react";
import classes from "./style/WideCard.module.css";

interface WideCardProps {
  firstChild: ReactNode;
  sedondChild: ReactNode;
  treeChild: ReactNode;
  icon: ReactNode;
}
export const WideCard: FC<{ props: WideCardProps }> = memo(({ props }) => {
  const { firstChild, sedondChild, treeChild, icon } = props;
  return (
    <div className={classes.card}>
      <div className={classes.firstChild}>{firstChild}</div>
      <div className={classes.sedondChild}>{sedondChild}</div>
      <div className={classes.treeChild}>{treeChild}</div>
      <div className={classes.like}>
        {icon}
      </div>
    </div>
  );
});
