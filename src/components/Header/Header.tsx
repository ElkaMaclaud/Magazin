import React from "react";
import classes from "./style/Header.module.css";
import { Link } from "react-router-dom";
import {
  Cart,
  Favorites,
  Orders,
  SearchIcon,
} from "../../UI_Component/Icons";
import { Button, InputSearch } from "../../UI_Component";
import CustomLink from "../CustomLink/CustomLink";
import MenuLogin from "../Menu/MenuLogin";
import CatalogButton from "../CatalogButton/CatalogButton";
const Header = () => {
  return (
    <div className={classes.headerWrapper}>
      <div className={classes.header}>
        <CustomLink to="magazin">Magazin</CustomLink>
        <CatalogButton text={"Каталог"}  />  
        <div className={classes.searchBar}>
          <InputSearch />
          <Button
            children={<SearchIcon />}
            onClick={() => console.log("cart")}
          />
        </div>
        <div className={classes.buttonGroop}>
          <MenuLogin />
          <Link to="orderListPage" className={classes.link}>
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
          <Link to="cart" className={classes.link}>
            <div className={classes.linkWrapperText}>
              <Cart />
              Корзина
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
