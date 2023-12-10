import { ReactNode } from "react";

export interface IListCategory {
  name: ReactNode;
  icon?: ReactNode;
  link?: string;
  listCategory?: Array<string>,
}
