import { Link } from "react-router-dom";
import { Book } from "../UI_Component/Icons";
import { IListCategory } from "../type/categoryType";

export const categories: IListCategory[] = [
    {name: "Электроника", icon: <Book/>},
    {name: "Одежда", icon: <Book/>},
    {name: "Обувь", icon: <Book/>},
    {name: "Дом и сад", icon: <Book/>},
    {name: "Аптека", icon: <Book/>},
    {name: "Продукты питания", icon: <Book/>},
    {name: "Книги", icon: <Book/>},
    {name: "Спорт и отдых", icon: <Book/>},
    {name: "Туризм, рыбалка, охота", icon: <Book/>},
    {name: "Товары для животных", icon: <Book/>},
    {name: "Автотовары", icon: <Book/>},
    {name: "Бытовая химия и гигиена", icon: <Book/>},
    {name: "Автомобили", icon: <Book/>},    
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