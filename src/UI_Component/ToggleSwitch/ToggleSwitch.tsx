import React, { ChangeEvent, FC } from "react";
import classes from "./style/ToggleSwitch.module.css";

export const ToggleSwitch: FC<{check?: boolean; setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ check, setCheck }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked)
  };
  return (
    <label className={classes.switch}>
      <input type="checkbox" onChange={onChange} checked={check}/>
      <span className={classes.slider}></span>
    </label>
  );
};
