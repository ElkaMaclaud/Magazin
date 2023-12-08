import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
  // const category = pathname.split("/").pop();     или pathname.split("/")[pathname.split("/").length - 1];
  const { categoryName } = useParams();
  const [products, setProducts] = useState<IGoods[]>(goods);
  const [selectSort, setSelectSort] = useState<string>("new");
  const [checked, setChecked] = useState({
    sale: false,
    installmentPlan: false,
    cash: false,
    pointsForRev: false,
  });
  useLayoutEffect(() => {
    if (goods.length && goods[0].category !== categoryName) {
      dispatch(GET_GOODS_BY_CATEGORY(categoryName ? categoryName : ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);
  useLayoutEffect(() => {
    if (!goods.length) {
      dispatch(GET_GOODS_BY_CATEGORY(categoryName ? categoryName : ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setFilters = (key: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [key]: value }));
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const select = e.target.value;
    setSelectSort(select);
    selectSortChange(select);
  };
  function selectSortChange(select: string, filter = false) {
    setProducts((prev) => {
      const sortedProducts = filter ? [...prev.filter((good) => good.sale)] : [...prev];
      if (select === "cheap") {
        return sortedProducts.sort((a, b) => a.price - b.price);
      } else if (select === "expensive") {
        return sortedProducts.sort((a, b) => b.price - a.price);
      } else if (select === "popular") {
        return sortedProducts.sort((a, b) => a.image.length - b.image.length);
      }
      return sortedProducts.sort((a, b) => b.image.length - a.image.length);
    });
  }
  const list = [
    {
      name: (
        <h3>{categories.find((item) => item.link === categoryName)?.name}</h3>
      ),
    },
    {
      name: "Распродажа",
      icon: (
        <ToggleSwitch
          key={Math.random().toString(36)}
          keyState={"sale"}
          check={checked.sale}
          setCheck={setFilters}
        />
      ),
    },
    {
      name: "Рассрочка",
      icon: (
        <ToggleSwitch
          key={Math.random().toString(36)}
          keyState={"installmentPlan"}
          check={checked.installmentPlan}
          setCheck={setFilters}
        />
      ),
    },
    {
      name: "Оплата наличными",
      icon: (
        <ToggleSwitch
          key={Math.random().toString(36)}
          keyState={"cash"}
          check={checked.cash}
          setCheck={setFilters}
        />
      ),
    },
    {
      name: "Баллы за отзыв",
      icon: (
        <ToggleSwitch
          key={Math.random().toString(36)}
          keyState={"pointsForRev"}
          check={checked.pointsForRev}
          setCheck={setFilters}
        />
      ),
    },
  ];
  useEffect(() => {
    if (checked.sale) {
      selectSortChange(selectSort, true);
    } else {
      setProducts(() => goods);
      selectSortChange(selectSort);
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
        <select
          value={selectSort}
          onChange={handleChange}
        >
          <option value="popular">Популярные</option>
          <option value="cheap">Сначала дешёвые</option>
          <option value="expensive">Сначала дорогие</option>
          <option value="new">Новинки</option>
        </select>
        <GoodsList data={products} icon={"like"} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
