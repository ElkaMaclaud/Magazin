import React, { FC, FormEvent, SetStateAction } from "react";
import PhoneInput from "../PhoneComponent";
import classes from "./style/Login.module.css";
import { AUT_USER, REGISTER_USER } from "../../store/slice";
import { useAppDispatch } from "../../store/reduxHooks";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../UI_Component";

export const Login: FC<{
  fromPage?: string, handleAction?:
  (value: SetStateAction<boolean>) => void
}> = (
  { fromPage, handleAction }
) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      const submitEvent = event.nativeEvent as SubmitEvent;
      const submitter = submitEvent.submitter as HTMLButtonElement;
      event.stopPropagation();
      event.preventDefault();
      const target = event.target as typeof event.target & {
        name: { value: string };
        phone: { value: string };
        email: { value: string };
        dateofBirth: { value: Date };
        password: { value: string };
      };
      const value = {
        name: target.name.value,
        phone: target.phone.value,
        email: target.email.value,
        dateofBirth: target.dateofBirth.value,
        password: target.password.value,
      };
      if (submitter.dataset.action === "auth") {
        dispatch(AUT_USER(value));
      } else {
        dispatch(REGISTER_USER(value));
        
      }
      handleAction && handleAction(false)
      fromPage && navigate(fromPage, { replace: true });
    };
    return (
      <div className={classes.wrapper}>
        <h1 style={{ textAlign: "center", marginTop: "10%" }}>Войти в профиль</h1>
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
          <Input label name="name" handleChange={() => { }} value="" required />
          <Input label name="email" handleChange={() => { }} value="" />
          <PhoneInput label={"Ваш номер телефона"} name="phone" />
          <Input
            label
            name="password"
            handleChange={() => { }}
            value=""
            required
          />
          <Input label name="dateofBirth" handleChange={() => { }} value="" />
          <Button data-action="register" styles={{ width: "100%", padding: "15px" }}>
            Зарегистрироваться
          </Button>
          <Button data-action="auth" styles={{ width: "100%", padding: "15px" }}>
            Войти в магазин
          </Button>
        </form>
      </div>
    );
  };
