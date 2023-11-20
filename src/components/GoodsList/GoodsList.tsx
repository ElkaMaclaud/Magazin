import React, { FC, ReactNode } from "react";
import { IGoods } from "../../type/goodsType";
import { WideCard } from "../WideCard/WideCard";

const GoodsList: FC<{
  data: IGoods[];
  setList?: React.Dispatch<React.SetStateAction<IGoods[]>>;
  icon?: ReactNode;
}> = ({ data, icon, setList }) => {
  return (
    <div>
      {data.map((item) => {
        return <WideCard key={item.id} good={item} child={icon} setList={setList}/>;
      })}
    </div>
  );
};

export default GoodsList;
