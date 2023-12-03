import React, { FC, FormEvent } from "react";
import PhoneInput from "../PhoneComponent";
import classes from "./style/Login.module.css";
import { AUT_USER } from "../../store/slice";
import { useAppDispatch } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../UI_Component";

export const Login: FC<{ fromPage?: string }> = ({ fromPage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      phone: { value: string };
      email: { value: string };
      dateOfBirt: { value: Date };
      password: { value: string };
    };
    const value = {
      name: target.name.value,
      phone: target.phone.value,
      email: target.email.value,
      dateOfBirt: target.dateOfBirt.value,
      password: target.password.value,
    };
    dispatch(AUT_USER(value));
    fromPage && navigate(fromPage, { replace: true });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>Войти в профиль</h1>
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <Input label name="name" handleChange={() => {}} value="" required />
        <Input label name="email" handleChange={() => {}} value="" />
        <PhoneInput label={"Ваш номер телефона"} name="phone" required />
        <Input
          label
          name="password"
          handleChange={() => {}}
          value=""
          required
        />
        <Input label name="dateOfBirt" handleChange={() => {}} value="" />
        <Button styles={{ width: "100%", padding: "15px" }}>
          Войти в магазин
        </Button>
      </form>
    </div>
  );
};
