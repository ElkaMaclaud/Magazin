import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  formatInputValue,
  getInputNumbersValue,
} from "../utils/formattedPhoneNumbers";
interface PhoneInputProps {
  classname?: string;
  name?: string;
  label: string;
  value?: string;
  upDataInput?: (key: string, value: string) => void;
  handlePhoneInput?: (value: { [key: string]: string }) => void;
}

const PhoneInput = ({
  classname,
  name,
  label,
  value,
  upDataInput,
  handlePhoneInput,
}: PhoneInputProps) => {
  const [formattedInputValue, setFormattedInputValue] = useState(
    (value && formatInputValue(value)) || ""
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  useEffect(() => {
    if (value) {
      setFormattedInputValue(formatInputValue(value));
    }
  }, [value]);
  // useEffect(() => {
  //   return () => {
  //     if (upDataInput && typeof upDataInput === "function" && name) {
  //     upDataInput(name, formattedInputValue);
  //     }}
  // });
  // useEffect(() => {
  //   if (inputRef.current?.input) {
  //     inputRef.current.input.setSelectionRange(cursor, cursor);
  //   }
  // }, [cursor]);
  // const validatePhone = () => {
  //   if (
  //     ["7", "8", "+"].indexOf(formattedInputValue[0]) > -1 &&
  //     getInputNumbersValue(formattedInputValue).length < 11
  //   ) {
  //     return true;
  //   } else if (getInputNumbersValue(formattedInputValue).length < 10) {
  //     return true;
  //   }
  //   return false;
  // };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumbersValue = getInputNumbersValue(e.target.value);
    setFormattedInputValue(formatInputValue(inputNumbersValue));
    let formatTempValue = "";
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;
    if (selectionStart !== null && selectionEnd !== null) {
      if (selectionStart < e.target.value.length) {
        const removedIndex = selectionStart;
        const newCursorPosition = Math.max(selectionStart - 1, 0);
        const newLine =
          inputNumbersValue.slice(0, removedIndex) +
          inputNumbersValue.slice(selectionStart);
        const newValue = getInputNumbersValue(newLine);
        setCursor(newCursorPosition + 1);
        formatTempValue = formatInputValue(newValue);
      } else {
        formatTempValue = formatInputValue(inputNumbersValue);
      }
      setFormattedInputValue(formatTempValue);
    }
    // if (upDataInput && typeof upDataInput === "function" && name) {
    //   upDataInput(name, e.target.value);
    // }
    if (
      handlePhoneInput &&
      typeof handlePhoneInput === "function" &&
      typeof name === "string"
    ) {
      const setDataFun = { [name]: formatInputValue(inputNumbersValue) };
      handlePhoneInput(setDataFun);
    }
  };
  const onBlur = () => {
    if (upDataInput && typeof upDataInput === "function" && name) {
      upDataInput(name, formattedInputValue);
    }
  }
  const handlePhoneKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (cursor !== null) {
      if (e.key !== "Backspace" && (cursor === 12 || cursor === 15)) {
        setCursor(cursor + 1);
      }
      if (e.key !== "Backspace" && cursor < 6 && cursor >= 4) {
        return null;
      } else if (e.key !== "Backspace" && cursor < 4) {
        setCursor(3);
      } else if (e.key === "Backspace" && cursor < 4) {
        setCursor(formattedInputValue.length);
      } else if (e.key !== "Backspace" && cursor === 6) {
        return null;
      } else if (e.key !== "Backspace" && cursor === 7) {
        setCursor(cursor + 2);
      } else if (e.key !== "Backspace" && cursor === 8) {
        setCursor(cursor);
      }
    }
  };
  // const validatePhoneCustomer = async (value: Object) => {
  //   if (!value || validatePhone()) {
  //     return Promise.reject("Номер должен содержать 11 цифр");
  //   }
  //   return Promise.resolve();
  // };
  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        name={name}
        className={classname}
        // rules={[
        //   {
        //     validator: validatePhoneCustomer,
        //   },
        // ]}
        ref={inputRef}
        placeholder={"+7 (977) 777-77-77"}
        maxLength={18}
        onChange={onChange}
        value={formattedInputValue}
        onKeyDown={handlePhoneKeyDown}
        onBlur={onBlur}
      ></input>
    </>
  );
};

export default PhoneInput;
