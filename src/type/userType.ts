import { IGoods } from "./goodsType";

export interface IUser {
  _id?: string;
  publik: IInfoPublik;
  privates: IInfoPrivate;
  favorite: IGoods[]; //string[];
  cart: IGoods[]; //Array<string>;
  purchased: IPurchased[];
  delivery: IDelivery;
  good?: IGoods;
  registered: boolean,
  chats: string[]  
}
export interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
export interface IInfoPrivate extends Omit<IInfoPublik, "name" >{
  phone?: string;
  dateofBirth?: Date;
  email: string;
  gender?: "Ж" | "М";
}
export interface IDelivery {
  address?: string;
  pickUpPoin: string;
  choice: "address" | "pickUpPoin"
}
export interface IPurchased extends IGoods {
  delivery?: IDelivery
}