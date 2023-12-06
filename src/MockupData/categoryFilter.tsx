import { Link } from "react-router-dom";
import { Book } from "../UI_Component/Icons";
import { IListCategory } from "../type/categoryType";

export const categories: IListCategory[] = [
    {name: "Электроника", icon: <Book/>, link: "electronika"},
    {name: "Одежда", icon: <Book/>, link: "cloth"},
    {name: "Обувь", icon: <Book/>, link: "shoes"},
    {name: "Дом и сад", icon: <Book/>, link: "houseAndGarden"},
    {name: "Аптека", icon: <Book/>, link: "pharmacy"},
    {name: "Продукты питания", icon: <Book/>, link: "food"},
    {name: "Книги", icon: <Book/>, link: "books"},
    {name: "Спорт и отдых", icon: <Book/>, link: "sportsAndRecreation"},
    {name: "Туризм, рыбалка, охота", icon: <Book/>, link: "TourismFishingHunting"},
    {name: "Товары для животных", icon: <Book/>, link: "GoodsForPets"},
    {name: "Автотовары", icon: <Book/>, link: "automotiveProducts"},
    {name: "Бытовая химия и гигиена", icon: <Book/>, link: "householdChemicalsAndHygiene"},
    {name: "Автомобили", icon: <Book/>, link: "cars"},    
]

export const accountList: IListCategory[] = [
    {name: <h3>Личная информация</h3>},
    {name: <Link to="">Главная</Link>},
    {name: <Link to="">Способы оплаты</Link>},
    {name: <Link to="">Баланс средств</Link>},
    {name: <h3>Заказы</h3>},
    {name: <Link to="">Моя корзина</Link>},
    {name: <Link to="">Мои заказы</Link>},
    {name: <Link to="">Мои возвраты</Link>},
    {name: <Link to="">Купленные товары</Link>},
    {name: <Link to="">Сообщения</Link>},
    {name: <h3>Подписки</h3>},
    {name: <Link to="">Избранное</Link>},
    {name: <h3>Настройки аккаунта</h3>},
    {name: <Link to="../account">Моя учетная запись</Link>},

]