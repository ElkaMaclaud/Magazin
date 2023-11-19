import React, {
  CSSProperties,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { CardForInfo, Slider } from "../../UI_Component";
import classes from "./style/DeliveryDate.module.css";
import { BurgerMenu } from "../../UI_Component/Icons";
import { goods } from "../../MockupData/goods";
import { deliveryChoice } from "../../MockupData/personInfoData";
import Dropdown from "../Dropdown/Dropdown";
import { Modal } from "../Modal/Modal";

const DeliveryDate = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const refShowDropDown = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState("bottom");
  let style: CSSProperties = getСoordinates();
  const [choicesGoods, setChoicesGoods] = useState(
    goods.filter((item) => item.choice).map((img) => img.image[0])
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const tooltipRect = ref.current.getBoundingClientRect();
        if (tooltipRect.bottom - 100 > window.innerHeight) {
          setTooltipPosition("top");
        } else if (tooltipRect.bottom + 100 < window.innerHeight) {
          setTooltipPosition("bottom");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    style = getСoordinates();
  }, [tooltipPosition]);
  const canselPurchase = () => {
    setChoicesGoods(() => []);
    setShowDropDown(false);
    setShowModal(false);
  };
  const handleDropDownClick = () => {
    setShowDropDown(false);
    setShowModal(true);
  };
  function getСoordinates(): CSSProperties {
    const top = refShowDropDown.current?.offsetTop;
    const left = refShowDropDown.current?.offsetLeft;
    if (tooltipPosition === "top") {
      return { top: `${top && top - 100}px`, left: `${left && left - 98}px` };
    }
    return { top: `${top && top + 45}px`, left: `${left && left - 98}px` };
  }
  return (
    <CardForInfo>
      <div className={classes.headerWrapper}>
        <h3>Ожидаемая доставка: завтра {} бесплатно</h3>
        <div
          ref={refShowDropDown}
          onClick={() => setShowDropDown(!showDropDown)}
          className={classes.burgerWrapper}
        >
          <BurgerMenu />
        </div>
      </div>
      <Slider list={choicesGoods} />
      {/* goods.filter((item) => item.choice).map((img) => img.image[0]) */}
      <div className={classes.footer}>
        <p>
          Доставка в{" "}
          {`${
            deliveryChoice.pickUpPoin
              ? "Пункт Magazin"
              : `${deliveryChoice.address}`
          }`}
        </p>
      </div>
      {showDropDown && (
        <Dropdown
          ref={ref}
          list={["Переместить в корзину"]}
          handleAction={handleDropDownClick}
          style={style}
          after={tooltipPosition === "top" && true}
        />
      )}
      {showModal && (
        <Modal
          title="Переметить в корзину"
          content="Вы точно хотите убрать эти товары из заказа? Они будут доступны в корзине"
          buttonText="Переместить"
          handleAction={canselPurchase}
        />
      )}
    </CardForInfo>
  );
};

export default DeliveryDate;
