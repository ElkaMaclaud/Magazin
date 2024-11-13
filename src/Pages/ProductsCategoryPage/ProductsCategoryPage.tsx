import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import SideBar from "../../components/SideBar/SideBar";
import classes from "./style/ProductsCategoryPage.module.css";
import GoodsList from "../../components/GoodsList/GoodsList";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import ListItem from "../../components/ListItem/ListItem";
import { categories } from "../../MockupData/categoryFilter";
import { Dropdown, OptionCard, ToggleSwitch } from "../../UI_Component";
import { IGoods } from "../../type/goodsType";
import { GET_GOODS_BY_CATEGORY, GET_GOODS_BY_KEYWORD } from "../../store/slice";
import { useLocation, useParams } from "react-router-dom";
import { ArrowSmall } from "../../UI_Component/Icons";
import { optionsSort } from "../../MockupData/menuItems";
import { useToggle } from "../../hooks/useToggle";
import Spinner from "../../components/Spinner/Spinner";

const ProductsCategoryPage = () => {
  const { data, isloading } = useAppSelector((state) => state.page);
  const { goods } = data
  const dispatch = useAppDispatch();
  const { categoryName } = useParams();
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const queryWord = queryParams.get("keyWord");
  const [products, setProducts] = useState<IGoods[]>(goods);
  const [selectSort, setSelectSort] = useState(optionsSort[0]);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  let style: CSSProperties = {
    ...getСoordinates(),
    width: `${refParent.current?.clientWidth && refParent.current?.clientWidth + 5
      }px`,
    overflow: "hidden",
    padding: "0",
    zIndex: "1",
    boxShadow: "0px 0px 10px rgba(56, 49, 49, 0.1)",
    borderRadius: "10px",
  };
  const [checked, setChecked] = useState({
    sale: false,
    installmentPlan: false,
    cash: false,
    pointsForRev: false,
  });
  useEffect(() => {
    if(!queryWord) {
      dispatch(GET_GOODS_BY_CATEGORY(categoryName || ""));
    } else if (queryWord && !goods.length) {
      dispatch(GET_GOODS_BY_KEYWORD(queryWord))
    }
  }, []);

  useEffect(() => {
    setProducts(goods)
  }, [goods])
  const setFilters = (key: string, value: boolean) => {
    setChecked((prev) => ({ ...prev, [key]: value }));
  };
  const handleChange = (select: string[]) => {
    setSelectSort(select);
    selectSortChange(select[0]);
  };
  function getСoordinates(): CSSProperties {
    const top = refParent.current?.offsetTop;
    const left = refParent.current?.offsetLeft;
    return { top: `${top && top + 45}px`, left: `${left}px` };
  }
  function selectSortChange(select: string, filter = false) {
    setProducts((prev) => {
      const sortedProducts = filter
        ? [...prev.filter((good) => good.sale)]
        : [...prev];
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
  ];
  useEffect(() => {
    if (checked.sale) {
      selectSortChange(selectSort[0], true);
    } else {
      setProducts(goods);
      selectSortChange(selectSort[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  function handleClick(event: MouseEvent) {
    if (
      event.target instanceof Node &&
      !ref.current?.contains(event.target) &&
      !refParent.current?.contains(event.target)
    ) {
      toggleShowDropDown();
    }
  }
  useEffect(() => {
    if (showDropDown) {
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 0);
    }
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropDown]);
  if (isloading) {
    return (
      <div className={classes.contentWrapper}>
        <Spinner />
      </div>
    )
  }
  if (!isloading && !goods.length) {
    return (
      <div className={classes.contentWrapper}>
        <div className={classes.noProductsWrapper}>
          <h2>Упс...</h2><h3>Товаров данной категории не найдено</h3>
        </div>
      </div>
    )
  }
  return (
    <div className={classes.contentWrapper}>
      <div className={classes.sideBar}>
        <SideBar>
          <ListItem list={list} />
        </SideBar>
      </div>
      <div className={classes.content}>
        <div
          className={classes.select}
          ref={refParent}
          onClick={!showDropDown ? toggleShowDropDown : () => { }}
        >
          <input readOnly={true} value={selectSort[1]} />
          <div className={showDropDown ? classes.optionACtive : classes.option}>
            <ArrowSmall />
          </div>
        </div>
        {showDropDown && (
          <Dropdown
            ref={ref}
            children={
              <OptionCard
                value={selectSort}
                list={optionsSort}
                handleClick={handleChange}
              />
            }
            style={style}
            notPseudoElement
          />
        )}
        <GoodsList data={products} icon={"like"} />
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
