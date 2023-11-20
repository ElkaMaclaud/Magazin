export interface IGoods {
    id: string;
    image: Array<string>;
    price: number;
    name: string;
    category: string;
    description: string;
    characteristics: any;
    favorite?: boolean;
    count?: number;
    choice?: boolean;
}


