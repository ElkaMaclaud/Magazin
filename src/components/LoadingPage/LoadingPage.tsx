import React from "react";
import classes from "./style/LoadingPage.module.css";

const LoadingPage = () => {
  const list = Array.from({ length: 12 });
  return (
    <div className={classes.body}>
      <div className={classes.pl}>
        {list.map((item, index) => {
          return <div key={index} className={classes.pl__dot}></div>;
        })}
        <div className={classes.pl__text}>Loading…</div>
      </div>
    </div>
  );
};

export default LoadingPage;
