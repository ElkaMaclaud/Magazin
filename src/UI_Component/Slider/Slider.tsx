import React, { FC, useEffect, useRef, useState } from "react";
import classes from "./style/Slider.module.css";
import { Arrow } from "../Icons";
interface IPlace {
  left: number;
  right: number;
  top: number;
}
const WIDTH = 450;
export const Slider: FC<{list: Array<any>}> = ({list}) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [placeArrow, setPlaceArrow] = useState<IPlace>({
    left: 0,
    right: 0,
    top: 0,
  });
  useEffect(() => {
    setPlaceArrow(() => ({
      top: topPlaceArrow(),
      left: getPlaceLeftArrow(),
      right: getPlaceRightArrow(),
    }));
  }, []);
  const maxWidth = () => {
    return list.length * (109 + 7) + 13;
  };
  const handleLeftArrowClick = () => {
    setOffset((prev) => {
      if (ref.current) {
        if (Math.abs(prev) > ref.current.clientWidth) {
          return prev + ref.current.clientWidth;
        }
        return 0;
      }
      return prev + WIDTH;
    });
  };
  const handleRightArrowClick = () => {
    setOffset((prev) => {
      if (ref.current) {
        if (ref.current.clientWidth < ultraRight()) {
          return prev - ref.current.clientWidth;
        }
        return prev - ultraRight();
      }
      return prev - WIDTH;
    });
  };
  const ultraRight = () => {
    if (ref.current) {
      return maxWidth() + (offset - ref.current.clientWidth);
    }
    return maxWidth() - WIDTH;
  };
  const showRightArrow = () => {
    if (ref.current) {
      return (
        maxWidth() - 20 > Math.abs(offset - ref.current.clientWidth)
      );
    }
  };
  const getPlaceLeftArrow = () => {
    if (ref.current) {
      return ref.current.offsetLeft - 50;
    }
    return 100;
  };
  const getPlaceRightArrow = () => {
    if (ref.current) {
      return ref.current.offsetLeft + ref.current.clientWidth - 20;
    }
    return 200;
  };
  const topPlaceArrow = () => {
    if (ref.current) {
      return ref.current.offsetTop + 10;
    }
    return 100;
  };
  const getMargin = () => {
    if (showRightArrow() && offset < 0) {
      return "0 -20px 0 -20px";
    }
    if (offset < 0) {
      return "0 0 0 -20px";
    }
    return "0 -20px 0 0";
  };
  return (
    <div className={classes.cardWrapper} ref={ref}  style={{ margin: `${getMargin()}` }}>
      <div
        className={classes.imagesWrapper}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {list.map((item) => {
          const key = Math.random().toString(36).substring(2, 15);
          return (
            <div key={key} className={classes.imageWrapper}>
              <img src={item} className={classes.image} alt="" />
            </div>
          );
        })}
      </div>
      <button
        style={{
          left: `${placeArrow.left}px`,
          top: `${placeArrow.top}px`,
        }}
        className={offset < 0 ? classes.arrow : classes.arrowHidden}
        onClick={handleLeftArrowClick}
      >
        <Arrow left />
      </button>
      <button
        style={{
          left: `${placeArrow.right}px`,
          top: `${placeArrow.top}px`,
        }}
        className={showRightArrow() ? classes.arrow : classes.arrowHidden}
        onClick={handleRightArrowClick}
      >
        <Arrow />
      </button>
    </div>
  );
};
