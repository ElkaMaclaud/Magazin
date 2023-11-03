import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/Catalogs.module.css";
import { ListItem } from "../../UI_Component/ListItem/ListItem";
import { categories } from "../../MockupData/categoryFilter";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { IGoods } from "../../type/goodsType";
import { goods } from "../../MockupData/goods";
import GoodsList from "../../components/GoodsList/GoodsList";

const Catalogs = () => {
  const [data, setData] = useState<IGoods[]>();
  useEffect(() => {
    setTimeout(() => {
      setData(goods);
    }, 700);
  }, []);


  if (data) {
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <>
          <ListItem list={categories} />
            {/* <UserAvatar name={personPrivateInfo["ФИО"]} /> */}
          </>
        </SideBar>
      </div>
      {/* <div><Profile /></div> */}
      <div className={classes.content}>
        <GoodsList data={data} icon={"like"}/>
      </div>
    </div>
  );
}
return <LoadingPage />;
};

export default Catalogs;
