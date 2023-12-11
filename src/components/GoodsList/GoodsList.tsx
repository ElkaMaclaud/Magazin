import React, { CSSProperties, FC, ReactNode } from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";

const GoodsList: FC<{
  data: IGoods[];
  icon?: ReactNode;
  orientationVertical?: boolean;
}> = ({ data, icon, orientationVertical }) => {
  const style: CSSProperties = orientationVertical ? {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "20px",
    margin:"20px",
    gap: "20px",
    flexWrap: "wrap",
  } : {}
  return (
    <div style={style}>
      {data.map((item) => {
        return <WideCard key={item.id} good={item} child={icon} orientationVertical={orientationVertical} />;
      })}
    </div>
  );
};

export default GoodsList;
