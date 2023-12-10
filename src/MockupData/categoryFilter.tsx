import { Link } from "react-router-dom";
import { Automotive, Book, Cars, Cloth, Food, Furniture, GoodsForPets, HouseAndGarden, HouseholdChemical, Pharmacy, Phone, Shoes, Sport, Tourism } from "../UI_Component/Icons";
import { IListCategory } from "../type/categoryType";

export const categories: IListCategory[] = [
  { name: "Электроника", icon: <Phone />, link: "electronika" },
  { name: "Одежда", icon: <Cloth />, link: "cloth" },
  { name: "Обувь", icon: <Shoes />, link: "shoes" },
  { name: "Дом и сад", icon: <HouseAndGarden />, link: "houseAndGarden" },
  { name: "Аптека", icon: <Pharmacy />, link: "pharmacy" },
  { name: "Продукты питания", icon: <Food />, link: "food" },
  { name: "Книги", icon: <Book />, link: "books" },
  { name: "Мебель", icon: <Furniture />, link: "furniture" },
  { name: "Спорт и отдых", icon: <Sport />, link: "sportsAndRecreation" },
  {
    name: "Туризм, рыбалка, охота",
    icon: <Tourism />,
    link: "TourismFishingHunting",
  },
  { name: "Товары для животных", icon: <GoodsForPets />, link: "GoodsForPets" },
  { name: "Автотовары", icon: <Automotive />, link: "automotiveProducts" },
  {
    name: "Бытовая химия и гигиена",
    icon: <HouseholdChemical />,
    link: "householdChemicalsAndHygiene",
  },
  { name: "Автомобили", icon: <Cars />, link: "cars" },
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
  { name: <Link to="">Сообщения</Link> },
  { name: <h3>Подписки</h3> },
  { name: <Link to="">Избранное</Link> },
  { name: <h3>Настройки аккаунта</h3> },
  { name: <Link to="../account">Моя учетная запись</Link> },
];
