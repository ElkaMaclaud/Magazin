import React, {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";

const GoodsList: FC<{
  data: IGoods[];
  icon?: ReactNode;
  orientationVertical?: boolean;
}> = ({ data, icon, orientationVertical }) => {
  const [index, setIndex] = useState(10);
  const [goods, setGoods] = useState(data.slice(0, index));
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    setGoods(data.slice(0, index));
    if (data.length && index > data.length) {
      setLastScroll(-1);
    }
  }, [data, index]);

  const handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll - lastScroll > 30 && lastScroll >= 0) {
      setLastScroll(scroll);
      setIndex((prev) => (prev += 1));
    }
  };

  useEffect(() => {
    if (lastScroll >= 0) {
      document.addEventListener("scroll", handleScroll);
    }
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style: CSSProperties = orientationVertical
    ? {
        display: "flex",
        backgroundColor: "#fff",
        justifyContent: "center",
        marginTop: "20px",
        gap: "20px",
        flexWrap: "wrap",
      }
    : {};
  return (
    <div style={style}>
      {goods.map((item) => {
        return (
          <WideCard
            key={item._id}
            good={item}
            child={icon}
            orientationVertical={orientationVertical}
          />
        );
      })}
    </div>
  );
};

export default GoodsList;
