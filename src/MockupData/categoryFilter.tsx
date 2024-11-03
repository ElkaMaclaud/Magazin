import { Link } from "react-router-dom";
import {
  Automotive,
  Book,
  Cars,
  Cloth,
  Food,
  Furniture,
  GoodsForPets,
  HouseAndGarden,
  HouseholdChemical,
  Pharmacy,
  Phone,
  Shoes,
  Sport,
  Tourism,
} from "../UI_Component/Icons";
import { IListCategory } from "../type/categoryType";

export const categories: IListCategory[] = [
  {
    name: "Электроника",
    icon: <Phone />,
    link: "electronika",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Одежда",
    icon: <Cloth />,
    link: "cloth",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Обувь",
    icon: <Shoes />,
    link: "shoes",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Дом и сад",
    icon: <HouseAndGarden />,
    link: "houseAndGarden",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Аптека",
    icon: <Pharmacy />,
    link: "pharmacy",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Продукты питания",
    icon: <Food />,
    link: "food",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Книги",
    icon: <Book />,
    link: "books",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Мебель",
    icon: <Furniture />,
    link: "furniture",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Спорт и отдых",
    icon: <Sport />,
    link: "sportsAndRecreation",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Туризм, рыбалка, охота",
    icon: <Tourism />,
    link: "TourismFishingHunting",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Товары для животных",
    icon: <GoodsForPets />,
    link: "GoodsForPets",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Автотовары",
    icon: <Automotive />,
    link: "automotiveProducts",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Бытовая химия и гигиена",
    icon: <HouseholdChemical />,
    link: "householdChemicalsAndHygiene",
    listCategory: ["", "", "", "", "", "", ""],
  },
  {
    name: "Автомобили",
    icon: <Cars />,
    link: "cars",
    listCategory: ["", "", "", "", "", "", ""],
  },
];

export const accountList: IListCategory[] = [
  { name: <h3>Личная информация</h3> },
  { name: <Link to="">Главная</Link> },
  { name: <Link to="">Способы оплаты</Link> },
  { name: <Link to="">Баланс средств</Link> },
  { name: <h3>Заказы</h3> },
  { name: <Link to="">Моя корзина</Link> },
  { name: <Link to="">Мои заказы</Link> },
  { name: <Link to="">Мои возвраты</Link> },
  { name: <Link to="">Купленные товары</Link> },
  { name: <Link to="../chat">Сообщения</Link> },
  { name: <h3>Подписки</h3> },
  { name: <Link to="">Избранное</Link> },
  { name: <h3>Настройки аккаунта</h3> },
  { name: <Link to="../account">Моя учетная запись</Link> },
];
