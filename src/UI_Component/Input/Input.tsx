import React, { FC, ChangeEvent, useState } from "react";

export const Input: FC<{
  handleChange: (key: string, value: string) => void;
  name: string;
  value: string;
  label?: boolean;
  required?: boolean;
}> = ({ handleChange, name, value, label, required }) => {
  const [newValue, setNewValue] = useState(value);
  const [error, setError] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };
  const onBlur = () => {
    if (required && newValue.trim() === "") {
      setError("Некоректные данные");
    } else {
      setError("");
    }
    handleChange(name, newValue);
  };
  const getType = (name: string) => {
    if (name === "password") {
      return "password";
    }
    //if (name.substring(0, 4) === "date") {return "date"}
    if (name.startsWith("date")) {
      return "date";
    }
    return "text";
  };
  return (
    <>
      {label && <label htmlFor={name}>{name}</label>}
      <input
        required={required}
        onBlur={onBlur}
        type={`${getType(name)}`}
        onChange={onChange}
        name={name}
        value={newValue}
      />
      {error && (
        <span style={{ color: "red", marginTop: "-15px", border: "none"  }}>
          {error}
        </span>
      )}
    </>
  );
};
