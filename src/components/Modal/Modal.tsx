import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  ReactNode,
} from "react";
import ReactDOM from "react-dom";
import classes from "./style/Modal.module.css";
import { Cross } from "../../UI_Component/Icons";

interface IModal {
  title: string;
  content: ReactNode;
  handleAction: (remove?: boolean) => void;
  buttonText?: ReactNode;
}

export function Modal({ title, content, handleAction, buttonText }: IModal) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const node = document.querySelector("#react_modal");
  const [modalTop, setModalTop] = useState(0);
  
  useLayoutEffect(() => {
    if (ref.current) {
      setModalTop(
        window.scrollY + (window.innerHeight - ref.current?.clientHeight) / 2
      );
    }
  }, []);
  useEffect(() => {
    if (active) {
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } 
    return () => {
      document.getElementsByTagName('html')[0].style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    }
  }, [active]);
  useEffect(() => {
    setOpen(true);
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        if (open) {
          handleAction(false);
          setActive(false);
        }
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open, handleAction]);
  function onClick() {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && ref.current?.contains(event.target)) {
        handleAction();
        setActive(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }
  const closeModal = () => {
    handleAction(false);
    setActive(false);
  };
  const checkPropsType = (prop: ReactNode = content): prop is string => {
    return typeof prop === "string";
  };

  if (!node) return null;
  const ContentModal = () => {
    if (checkPropsType()) {
      return (
        <>
          <span></span>
          <p>{content}</p>
        </>
      );
    }
    return <>{content}</>;
  };
  return ReactDOM.createPortal(
    <div
      style={{ top: `${modalTop}px` }}
      className={active ? classes.modal : classes.modalFalse}
      ref={ref}
    >
      <div className={classes.roundCross} onClick={closeModal}>
        <Cross />
      </div>
      <div className={classes.modalContent}>
        <h2>{title}</h2>
        <ContentModal />
        {buttonText && (
          <button className={classes.button} onClick={onClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>,
    node
  );
}

// const body = document.querySelector("body");
// if (active && body) {
//   body.style.overflow = "hidden";
//   body.style.position = "fixed";
//   body.style.width = "100%";
//   body.style.height = "100%";
// }
// return () => {
//   if (body) {
//     body.style.overflow = "visible";
//     body.style.position = "static";
//     body.style.width = "auto";
//     body.style.height = "auto";
//   }
// };