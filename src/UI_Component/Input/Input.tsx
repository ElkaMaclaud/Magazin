import React, { FC, ChangeEvent, useState } from "react";

export const Input: FC<{
  handleChange: (key: string, value: string) => void;
  name: string;
  value: string;
  label?: boolean;
}> = ({ handleChange, name, value, label }) => {
  const [newValue, setNewValue] = useState(value);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };
  const onBlur = () => {
    handleChange(name, newValue);
  };
  const getType = (name: string) => {
    if (name === "password") {return "password"}
    //if (name.substring(0, 4) === "date") {return "date"}
    if (name.startsWith("date")) {
      return "date";
    }
    return "text"
  }
  return (
    <>
      {label && <label htmlFor={name}>{name}</label>}
      <input
        onBlur={onBlur}
        type={`${getType(name)}`}
        onChange={onChange}
        name={name}
        value={newValue}
      />
    </>
  );
};
