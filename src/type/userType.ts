import { IGoods } from "./goodsType";

export interface IUser {
  id?: string;
  publik: IInfoPublik;
  private: IInfoPrivate;
  favorite: IGoods[]; //string[];
  basket: IGoods[]; //Array<string>;
}
export interface IInfoPublik {
  name: string;
  city: string;
  age?: number;
}
export interface IInfoPrivate extends IInfoPublik {
  phone: string;
  dateOfBirt?: Date;
  email?: string;
  gender?: "Ж" | "М";
}
export interface IDelivery {
  adress?: string;
  pickUpPoin: boolean;
  address: boolean;
}
