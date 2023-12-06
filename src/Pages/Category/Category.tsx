import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/Category.module.css";
import { categories } from "../../MockupData/categoryFilter";
import { ListItem } from "../../UI_Component/ListItem/ListItem";


const Category = () => {
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={categories} />
        </SideBar>
      </div>
      <div className={classes.content}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo,
        molestias repudiandae fuga exercitationem doloremque placeat quod
        similique obcaecati! Illum quasi necessitatibus fugiat omnis autem
        officiis doloremque, rem repellendus in at!
      </div>
    </div>
  );
};

export default Category;
