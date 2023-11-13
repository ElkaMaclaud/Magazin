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
    <div className={classes.headerWrapper}>
      <div className={classes.header}>
        <CustomLink to="basket">Что-нибудь</CustomLink>
        <ConstructorFoCustomLink
          firsChild={<Burger />}
          secondChild={<Cross />}
          text={"Каталог"}
        />
        <div className={classes.searchBar}>
          <InputSearch />
          <Button
            title={<SearchIcon />}
            onClick={() => console.log("Basket")}
          />
        </div>
        <div className={classes.buttonGroop}>
          <MenuLogin />
          <Link to="basket" className={classes.link}>
            <div className={classes.linkWrapperText}>
              <Orders />
              Заказы
            </div>
          </Link>
          <Link to="favorites" className={classes.link}>
            <div className={classes.linkWrapperText}>
              <Favorites />
              Избранное
            </div>
          </Link>
          <Link to="basket" className={classes.link}>
            <div className={classes.linkWrapperText}>
              <Basket />
              Корзина
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
