import React from "react";
import classes from "./style/Header.module.css";
import {
  Account,
  Basket,
  Favorites,
  Orders,
  SearchIcon,
} from "../../UI_Component/Icons";
import { Button, InputSearch } from "../../UI_Component";

const Header = () => {
  return (
    <div className={classes.header}>
      <Button title={"Что-нибудь"} />
      <Button title={"Каталог"} />
      <div className={classes.searchBar}>
        <InputSearch />
        <Button title={<SearchIcon />} />
      </div>
      <div className={classes.buttonGroop}>
        <Account width={"60"} height={"60"}/>
        <Orders />
        <Favorites />
        <Basket />
      </div>
    </div>
  );
};

export default Header;
