import React, {
  CSSProperties,
  FC,
  ReactNode,
  UIEvent,
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
  const [goods, setGoods] = useState(data.slice(0, 6));
  useEffect(() => {
    setGoods(data.slice(0, 20));
  }, [data]);
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const scroll = e.currentTarget.scrollTop
    console.log("//////////////////", scroll)
  };
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
    <div style={style} onScroll={handleScroll}>
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
