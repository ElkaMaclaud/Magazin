import React, { FC, ReactNode } from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";

const GoodsList: FC<{
  data: IGoods[];
  icon?: ReactNode;
}> = ({ data, icon }) => {
  return (
    <div>
      {data.map((item) => {
        return <WideCard key={item.id} good={item} child={icon} />;
      })}
    </div>
  );
};

export default GoodsList;
