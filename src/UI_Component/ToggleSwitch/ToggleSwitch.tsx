import React, { ChangeEvent, FC } from "react";
import classes from "./style/ToggleSwitch.module.css";

export const ToggleSwitch: FC<{keyState: string; check?: boolean; setCheck: (key: string, value: boolean) => void;
}> = ({ keyState, check, setCheck }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(keyState, e.target.checked)
  };
  return (
    <label className={classes.switch}>
      <input type="checkbox" onChange={onChange} checked={check}/>
      <span className={classes.slider}></span>
    </label>
  );
};
