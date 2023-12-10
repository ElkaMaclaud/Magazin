import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/Category.module.css";
import { categories } from "../../MockupData/categoryFilter";
import ListItem from "../../components/ListItem/ListItem";
import { IListCategory } from "../../type/categoryType";
import { keyGenerate } from "../../utils/keyGenerate";
import { Link } from "react-router-dom";


const Category = () => {
  const [choiceCategory, setChoiceCategory] = useState<IListCategory>();
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={categories} setFoo={setChoiceCategory}/>
        </SideBar>
      </div>
      <div className={classes.content}>
        <h2>{choiceCategory?.name}</h2>
        <div className={classes.wrapperFilter}>{choiceCategory?.listCategory?.map((item) => {
          const key = keyGenerate();
          return (<Link to={`../category/${choiceCategory?.link || ""}`} key={key}>{choiceCategory?.name}</Link>)
        })}</div>
      </div>
    </div>
  );
};

export default Category;
