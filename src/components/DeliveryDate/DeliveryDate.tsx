import React, {
  CSSProperties,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { CardForInfo, Slider } from "../../UI_Component";
import classes from "./style/DeliveryDate.module.css";
import { BurgerMenu } from "../../UI_Component/Icons";
import { deliveryChoice } from "../../MockupData/personInfoData";
import Dropdown from "../Dropdown/Dropdown";
import { Modal } from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { CANSEL_PURCHASE } from "../../store/slice";
import { debounce } from "../../utils/debounce";

const DeliveryDate = () => {
  const { registered } = useAppSelector((state) => state.page.data.user);
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch =  useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const refShowDropDown = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState("bottom");
  let style: CSSProperties = getСoordinates();
  const MemoSlider = useMemo(() => <Slider list={registered.map((item) => item.image[0])} />, [registered])
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (ref.current) {
        const tooltipRect = ref.current.getBoundingClientRect();
        if (tooltipRect.bottom - 100 > window.innerHeight) {
          setTooltipPosition("top");
        } else if (tooltipRect.bottom + 100 < window.innerHeight) {
          setTooltipPosition("bottom");
        }
      }
    }, 50); 
  
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
    dispatch(CANSEL_PURCHASE())
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
      {MemoSlider}
      <div className={classes.footer}>
        <p>
          Доставка в
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


// let animationFrameId: number;
  
//     const handleScroll = () => {
//       animationFrameId = requestAnimationFrame(() => {
//         if (ref.current) {
//           const tooltipRect = ref.current.getBoundingClientRect();
//           if (tooltipRect.bottom > window.innerHeight) {
//             setTooltipPosition("top");
//           } else if (tooltipRect.bottom < window.innerHeight) {
//             setTooltipPosition("bottom");
//           }
//         }
//       });
//     };

// cancelAnimationFrame(animationFrameId);