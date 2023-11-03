import React, { FC, ReactNode } from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";

const FavoritesList: FC<{
  data: IGoods[];
  icon?: ReactNode;
}> = ({ data, icon }) => {
 
  return (
    <div key={Math.floor(Math.random()).toString(36).substring(2, 15)}>
      {data.map((item) => {
        return <WideCard key={item.id} item={item} child={icon} />;
      })}
    </div>
  );
};

export default FavoritesList;
