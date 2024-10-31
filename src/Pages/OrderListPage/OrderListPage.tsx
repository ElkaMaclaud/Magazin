import React, { useEffect } from "react";
import { CardPageFlex, TwoColorCard } from "../../UI_Component";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import SideBar from "../../components/SideBar/SideBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import classes from "./style/OrderListPage.module.css";
import { GET_OF_ORDERS } from "../../store/slice";
import Spinner from "../../components/Spinner/Spinner";

const OrderListPage = () => {
  const { data, isloading } = useAppSelector((state) => state.page);
  const { user } = data;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.purchased) dispatch(GET_OF_ORDERS());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isloading) {
    return (
      <CardPageFlex>
        <>
        <Spinner />
        </>
      </CardPageFlex>
    );
  }
  if (!user.purchased.length) {
    return (
      <CardPageFlex>
        <h1>У вас пока нет ни одной покупки!</h1>
      </CardPageFlex>
    );
  }
  return (
    <CardPageFlex>
      <h1>Заказы</h1>
      <div className={classes.wrapper}>
        <div className={classes.sidebar}>
          <SideBar>
            <UserAvatar name={localStorage.getItem("name") || ""} />
          </SideBar>
        </div>
        <div className={classes.orderCardWrapper}>
          {user.purchased.map((item) => {
            return (
              <TwoColorCard
                id={item._id}
                price={item.price}
                image={item.image[0]}
                delivery={
                  item.delivery || { pickUpPoin: "", choice: "pickUpPoin" }
                }
              />
            );
          })}
        </div>
      </div>
    </CardPageFlex>
  );
};

export default OrderListPage;
