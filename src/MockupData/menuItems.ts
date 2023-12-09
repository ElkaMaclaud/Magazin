export type IMenuItems = {
    name: string;
    link: string;
}
export const menuItems: IMenuItems[] = [
    {name: "Личный кабинет", link: "main"},
    {name: "Баллы и бонусы", link: "main"},
    {name: "Сообщения", link: "main"},
]
export const optionsSort = [
    ["popular", "Популярные"],
    ["cheap", "Сначала дешёвые"],
    ["expensive", "Сначала дорогие"],
    ["new", "Новинки"],
  ];

    // {
    //   name: "Рассрочка",
    //   icon: (
    //     <ToggleSwitch
    //       key={Math.random().toString(36)}
    //       keyState={"installmentPlan"}
    //       check={checked.installmentPlan}
    //       setCheck={setFilters}
    //     />
    //   ),
    // },
    // {
    //   name: "Оплата наличными",
    //   icon: (
    //     <ToggleSwitch
    //       key={Math.random().toString(36)}
    //       keyState={"cash"}
    //       check={checked.cash}
    //       setCheck={setFilters}
    //     />
    //   ),
    // },
    // {
    //   name: "Баллы за отзыв",
    //   icon: (
    //     <ToggleSwitch
    //       key={Math.random().toString(36)}
    //       keyState={"pointsForRev"}
    //       check={checked.pointsForRev}
    //       setCheck={setFilters}
    //     />
    //   ),
    // },