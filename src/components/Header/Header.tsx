import React from "react";
import classes from "./style/Header.module.css";
import { Link } from "react-router-dom";
import {
  Basket,
  Burger,
  Cross,
  Favorites,
  Orders,
  SearchIcon,
} from "../../UI_Component/Icons";
import { Button, InputSearch } from "../../UI_Component";
import CustomLink from "../CustomLink/CustomLink";
import ConstructorFoCustomLink from "../ConstructorFoCustomLink/ConstructorFoCustomLink";
import MenuLogin from "../Menu/MenuLogin";

const Header = () => {
  return (
    <div className={classes.header}>
      <CustomLink to="basket">Что-нибудь</CustomLink>
      <ConstructorFoCustomLink
        firsChild={<Burger />}
        secondChild={<Cross />}
        text={"Каталог"}
      />
      <div className={classes.searchBar}>
        <InputSearch />
        <Button title={<SearchIcon />} onClick={() => console.log("Basket")} />
      </div>
      <div className={classes.buttonGroop}>
          <MenuLogin />
        <Link to="Basket">
          <Orders />
        </Link>
        <Link to="favorites">
          <Favorites />
        </Link>
        <Link to="basket">
          <Basket />
        </Link>
      </div>
    </div>
  );
};

export default Header;
