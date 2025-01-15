import React, {
  CSSProperties,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { CardForInfo, Dropdown, Slider } from "../../UI_Component";
import classes from "./style/DeliveryDate.module.css";
import { BurgerMenu } from "../../UI_Component/Icons";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../../store/reduxHooks";
import { debounce } from "../../utils/debounce";
import MenuItem from "../MenuItem/MenuItem";
import { useToggle } from "../../hooks/useToggle";

const styles: CSSProperties = {objectFit: "cover"}
const DeliveryDate = () => {
  const { user } = useAppSelector((state) => state.page.data);
  const [showModal, toggleShowModal] = useToggle(false);
  const [showDropDown, toggleShowDropDown] = useToggle(false);
  const [goodList, setGoodList] = useState(user.cart.filter(i=>i.choice).map((item) => item.image[0]))
  const ref = useRef<HTMLDivElement>(null);
  const refShowDropDown = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState("bottom");
  let style: CSSProperties = getСoordinates();
  
  const MemoSlider = useMemo(
    () => (
      <Slider
        list={goodList}
        style={styles} 
        width={109}
        height={58} 
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [goodList]
  );
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (ref.current) {
        const tooltipRect = ref.current.getBoundingClientRect();
        if (tooltipRect.bottom > window.innerHeight - 100) {
          setTooltipPosition("top");
        } else if (tooltipRect.bottom - 200 < window.innerHeight) {
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
  const canselPurchase = (remove = true) => {
    toggleShowModal();
    setGoodList([])
  };
  const handleDropDownClick = () => {
    toggleShowDropDown();
    toggleShowModal();
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
          onClick={toggleShowDropDown}
          className={classes.burgerWrapper}
        >
          <BurgerMenu />
        </div>
      </div>
      {MemoSlider}
      <div className={classes.footer}>
        <p>
          Доставка в{" "}
          {`${
            user.delivery.choice === "pickUpPoin"
              ? "Пункт Magazin"
              : `${user.delivery.address}`
          }`}
        </p>
      </div>
      {showDropDown && (
        <Dropdown
          ref={ref}
          style={style}
          after={tooltipPosition === "top" && true}
        >
          <MenuItem
            list={["Переместить в корзину"]}
            handleAction={handleDropDownClick}
          ></MenuItem>
        </Dropdown>
      )}
      {showModal && (
        <Modal
          title="Перемеcтить в корзину"
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
