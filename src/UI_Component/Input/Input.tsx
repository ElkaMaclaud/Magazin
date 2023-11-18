import React, { FC, ChangeEvent, useState } from "react";

export const Input: FC<{ handleChange: (key: string, value: string) => void; name: string; value: string }> = ({
  handleChange,
  name,
  value,
}) => {
  const [newValue, setNewValue] = useState(value);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };
  const onBlur = () => {
    handleChange(name, newValue);
  }
  return <input onBlur={onBlur} type="text" onChange={onChange} name={name} value={newValue} />;
};

