import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./style/Modal.module.css";
import { Cross } from "../../UI_Component/Icons";

interface IModal {
  title: string;
  text: string;
  removeBasket: (remove?: boolean) => void;
}

export function Modal({ title, text, removeBasket }: IModal) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const node = document.querySelector("#react_modal");
  useEffect(() => {
    setOpen(true);
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        if (open) {
          removeBasket(false);
          setActive(false);
        }
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  function onClick() {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && ref.current?.contains(event.target)) {
        removeBasket();
        setActive(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }
  const closeModal = () => {
    removeBasket(false);
    setActive(false);
  };

  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={active ? classes.modal : classes.modalFalse} ref={ref}>
      <div className={classes.roundCross} onClick={closeModal}>
        <Cross />
      </div>
      <div className={classes.modalContent}>
        <h2>{title}</h2>
        <span></span>
        <p>{text}</p>
        <button className={classes.button} onClick={onClick}>
          Удалить
        </button>
      </div>
    </div>,
    node
  );
}
