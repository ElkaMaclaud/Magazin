import React, {MouseEvent} from 'react';
import PhoneInput from '../components/PhoneComponent';
import "./login.css";

export const Login = () => {
  const handleSubmit = (event: MouseEvent) =>  {
    event.stopPropagation();
    event.preventDefault();
    console.log("ghgg",  event.target)
  }
  return (
    <div>
      <h1 style={{textAlign: "center", marginTop: "10%"}}>Войти в профиль</h1>
      <form className={"form"}>
        <label htmlFor="">Ваше имя</label>
        <input></input>
        <label htmlFor="">Ваш Email</label>
        <input></input>
        <PhoneInput label={"Ваш номер телефона"} />
        <label htmlFor="">Введите пароль</label>
        <input type="password"></input>
        <button onClick={handleSubmit}>Войти в магазин</button>
      </form>
    </div>
  )
}

