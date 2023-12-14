import React, { FC, useState } from "react";
import { Account, Location, SmallArrow } from "../../UI_Component/Icons";
import classes from "./style/MethodOfObtaining.module.css";
import { CardForInfo, Input } from "../../UI_Component";
import { Modal } from "../Modal/Modal";
import PhoneInput from "../PhoneComponent";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { CHANGE_ACCOUNT_INFO, CHANGE_DELIVERY } from "../../store/slice";
interface IButton {
  curier: boolean;
  pickup: boolean;
}
interface IShowModal {
  accontEdit: boolean;
  delivery: boolean;
}
const MethodOfObtaining: FC = () => {
  const { user } = useAppSelector((state) => state.page.data);
  const dispatch = useAppDispatch();
  const name = localStorage.getItem("name") || "";
  const phone = localStorage.getItem("phone") || "";
  const [personInfo, setPersonInfo] = useState({name: name, phone: phone})
  const [showModal, setShowModal] = useState<IShowModal>({
    accontEdit: false,
    delivery: false,
  });
  const [activeButton, setActiveButton] = useState<IButton>({
    curier: false,
    pickup: true,
  });
  const getDeliveryPoint = () => {
    if (activeButton.curier) {
      return user.delivery.address;
    }
    return user.delivery.pickUpPoin;
  };
  const changeDelivery = (pickup = false) => {
    if (pickup) {
      setActiveButton(() => ({
        curier: false,
        pickup: true,
      }));
      dispatch(
        CHANGE_DELIVERY({
          ...user.delivery,
          choice: "pickUpPoin",
        })
      );
    } else {
      setActiveButton(() => ({
        pickup: false,
        curier: true,
      }));
      dispatch(
        CHANGE_DELIVERY({
          ...user.delivery,
          choice: "address",
        })
      );
    }
  };
  const saveNewValue = () => {
    dispatch(CHANGE_ACCOUNT_INFO(personInfo))
    setShowModal(() => ({ accontEdit: false, delivery: false }));
  };
  const handleChange = (key: string, value: string) => {
    setPersonInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <>
      <CardForInfo>
        <div className={classes.headerWrapper}>
          <h3>Способ получения</h3>
          <div>
            <button
              className={
                activeButton.pickup
                  ? classes.buttonObtainingActive
                  : classes.buttonObtaining
              }
              onClick={() => changeDelivery(true)}
            >
              Самовывоз
            </button>
            <button
              className={
                activeButton.curier
                  ? classes.buttonObtainingActive
                  : classes.buttonObtaining
              }
              onClick={() => changeDelivery()}
            >
              Курьером
            </button>
          </div>
        </div>
        <div
          className={classes.infoPersonal}
          onClick={() => setShowModal((prev) => ({ ...prev, delivery: true }))}
        >
          <div className={classes.infoData}>
            <Location />
            <div>
              <h4>Пунк Magazin</h4>
              <div className={classes.adress}>{getDeliveryPoint()}</div>
              <div>
                <p>Срок хранения заказа — 7 дней.</p>
                <p>
                  Можно продлить хранение ещё на 7 дней после доставки в пункт
                  выдачи
                </p>
              </div>
            </div>
          </div>
          <div className={classes.changeInfo}>Изменить</div>
        </div>
        {showModal.delivery && (
          <Modal
            title="Выберите способ доставки"
            content={<></>}
            handleAction={() =>
              setShowModal(() => ({ accontEdit: false, delivery: false }))
            }
          />
        )}
        <div
          className={classes.infoPersonal}
          onClick={() =>
            setShowModal((prev) => ({ ...prev, accontEdit: true }))
          }
        >
          <div className={classes.infoData}>
            <Account />
            <div className={classes.acountInfo}>
              {Object.keys({
                name: name,
                phone: phone,
              }).map((key: string) => {
                return (
                  <div key={key as keyof typeof user.private}>
                    {user.private[
                      key as keyof typeof user.private
                    ]?.toString() || ""}
                  </div>
                );
              })}
            </div>
          </div>
          <SmallArrow />
        </div>
        {showModal.accontEdit && (
          <Modal
            title="Данные получателя"
            content={
              <div className={classes.acountInfoEdit}>
                <div className={classes.inputWrapper}>
                  <label>Имя и фамилия </label>
                  <Input
                    name="name"
                    value={personInfo.name}
                    handleChange={handleChange}
                  />
                </div>
                <div className={classes.inputWrapper}>
                  <PhoneInput
                    label="Телефон"
                    name="phone"
                    value={personInfo.phone}
                    upDataInput={handleChange}
                  />
                </div>
              </div>
            }
            handleAction={saveNewValue}
            buttonText="Сохранить"
          />
        )}
      </CardForInfo>
    </>
  );
};

export default MethodOfObtaining;
