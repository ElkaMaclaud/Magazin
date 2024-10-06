import { IGoods } from "./goodsType";

export interface IUser {
  id?: string;
  publik: IInfoPublik;
  private: IInfoPrivate;
  favorite: IGoods[]; //string[];
  basket: IGoods[]; //Array<string>;
  registered: IGoods[];
  purchased: IPurchased[];
  delivery: IDelivery;
  choiceAll: boolean;
  good?: IGoods;
}
export interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
export interface IInfoPrivate extends IInfoPublik {
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