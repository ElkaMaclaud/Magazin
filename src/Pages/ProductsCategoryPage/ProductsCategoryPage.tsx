import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/ProductsCategoryPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppSelector } from "../../store/reduxHooks";
import ListItem from "../../components/ListItem/ListItem";
import { categories } from "../../MockupData/categoryFilter";
import { ToggleSwitch } from "../../UI_Component";
import { IGoods } from "../../type/goodsType";

const ProductsCategoryPage = () => {
  const { goods } = useAppSelector((state) => state.page.data);
  const [products, setProducts] = useState<IGoods[]>(goods);
  const [checked, setChecked] = useState(false)
  const list = [
    {
      name: (
        <h3>
          {
            categories.find((item) => item.link === products[0].category)
              ?.name
          }
        </h3>
      ),
    },
    {
      name: "Распродажа",
      icon: <ToggleSwitch check={checked} setCheck={setChecked}/>,
    },
  ]
  useEffect(() => {
    if (checked) {
      setProducts(() => goods.filter((good) => good.sale));
    } else {
      setProducts(() => goods);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]) 
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={list} />
        </SideBar>
      </div>
      <div className={classes.content}>
        <GoodsList data={products} icon={"like"} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
