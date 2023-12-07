import React, { useEffect, useLayoutEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/ProductsCategoryPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import ListItem from "../../components/ListItem/ListItem";
import { categories } from "../../MockupData/categoryFilter";
import { ToggleSwitch } from "../../UI_Component";
import { IGoods } from "../../type/goodsType";
import { GET_GOODS_BY_CATEGORY } from "../../store/slice";
import { useParams } from "react-router-dom";

const ProductsCategoryPage = () => {
  const { goods } = useAppSelector((state) => state.page.data);
  const dispatch = useAppDispatch();
  // const { pathname } = useLocation();
  // const category = pathname.split("/").reverse()[0];
  const {categoryName} = useParams();
  const [products, setProducts] = useState<IGoods[]>(goods);
  const [checked, setChecked] = useState(false);
  useLayoutEffect(() => {
    if (!goods.length) {
      dispatch(GET_GOODS_BY_CATEGORY(categoryName ? categoryName : ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = [
    {
      name: <h3>{categories.find((item) => item.link === categoryName)?.name}</h3>,
    },
    {
      name: "Распродажа",
      icon: <ToggleSwitch check={checked} setCheck={setChecked} />,
    },
  ];
  useEffect(() => {
    if (checked) {
      setProducts(() => goods.filter((good) => good.sale));
    } else {
      setProducts(() => goods);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
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
