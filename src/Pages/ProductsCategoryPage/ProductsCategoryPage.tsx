import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/ProductsCategoryPage.module.css";
import { ListItem } from "../../UI_Component/ListItem/ListItem";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppSelector } from "../../store/reduxHooks";
import { filterCategories } from "../../MockupData/filterCategories";

const ProductsCategoryPage = () => {
  const { goods } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={filterCategories || []} />
        </SideBar>
      </div>
      <div className={classes.content}>
        <GoodsList data={goods} icon={"like"} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
