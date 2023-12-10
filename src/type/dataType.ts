import { IGoods } from "./goodsType";
import { IUser } from "./userType";

export interface IData {
    user: IUser;
    goods: IGoods[];
    sale?: IGoods[];
    discount?: IGoods[];
}