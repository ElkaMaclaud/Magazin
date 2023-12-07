import React, { FC } from "react";
import classes from "./style/ToggleSwitch.module.css";

export const ToggleSwitch: FC<{check?: boolean; setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ check, setCheck }) => {
  const onChange = () => {
    setCheck(!check)
  };
  return (
    <label className={classes.switch}>
      <input type="checkbox" onChange={onChange} checked={check}/>
      <span className={classes.slider}></span>
    </label>
  );
};
