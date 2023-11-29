import React from "react";
import { CardPageFlex, TwoColorCard } from "../../UI_Component";
import { useAppSelector } from "../../store/reduxHooks";
import SideBar from "../../components/SideBar/SideBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import classes from "./style/OrderListPage.module.css";

const OrderListPage = () => {
  const { user } = useAppSelector((state) => state.page.data);
  if (user.purchased.length) {
    return (
      <CardPageFlex>
        <h1>Заказы</h1>
        <div className={classes.wrapper}>
          <div className={classes.sidebar}><SideBar>
            <UserAvatar name={user.private.name} />
          </SideBar></div>
          <div className={classes.orderCardWrapper}>
            {user.purchased.map((item) => {
              return (
                <TwoColorCard
                  id={item.id}
                  price={item.price}
                  image={item.image[0]}
                  delivery={item.delivery}
                />
              );
            })}
          </div>
        </div>
      </CardPageFlex>
    );
  }
  return (
    <CardPageFlex>
      <h1>У вас пока нет ни одной покупки!</h1>
    </CardPageFlex>
  );
};

export default OrderListPage;
