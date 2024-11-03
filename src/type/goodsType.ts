export interface IGoods {
    _id: string;
    image: Array<string>;
    price: number;
    name: string;
    category: string;
    description: string;
    characteristics: string;
    favorite?: boolean;
    count?: number;
    choice?: boolean;
    sale?: boolean;
    discount?: boolean;
    salesmanId: string
}


