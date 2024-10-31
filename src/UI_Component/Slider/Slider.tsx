import React, {
  CSSProperties,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./style/Slider.module.css";
import { Arrow } from "../Icons";
import { keyGenerate } from "../../utils/keyGenerate";
interface IPlace {
  left: number;
  right: number;
  top: number;
}
const WIDTH = 450;
export const Slider: FC<{
  list: Array<string>;
  width: number;
  height: number;
  style: CSSProperties;
  imageWrapperStyle?: CSSProperties;
  noMargin?: boolean;
}> = ({ list, style, width, height, imageWrapperStyle, noMargin }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const maxWidth = () => {
    if (noMargin) {
      return list.length * width;
    }
    return list.length * (width + 7) + 13;
  };
  const handleLeftArrowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
  const handleRightArrowClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      return maxWidth() - 20 > Math.abs(offset - ref.current.clientWidth);
    }
  };
  const getPlaceLeftArrow = () => {
    if (ref.current) {
      return ref.current.offsetLeft - (noMargin ? 30 : 50);
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
      if (noMargin) {
        return ref.current.offsetTop + height / 3;
      }
      return ref.current.offsetTop + height / 6;
    }

    return 100;
  };
  const getMargin = () => {
    if (noMargin) {
      return "0";
    } else if (showRightArrow() && offset < 0) {
      return "0 -20px 0 -20px";
    } else if (offset < 0) {
      return "0 0 0 -20px";
    }
    return "0 -20px 0 0";
  };
  return (
    <div
      className={classes.cardWrapper}
      ref={ref}
      style={{ margin: `${getMargin()}` }}
    >
      <div
        className={classes.imagesWrapper}
        style={{
          transform: `translateX(${offset}px)`,
          gap: `${noMargin ? "0" : "7px"}`,
        }}
      >
        {list.map((item) => {
          const key = keyGenerate();
          return (
            <div
              key={key}
              className={classes.imageWrapper}
              style={{
                width: `${width}px`,
                ...imageWrapperStyle,
              }}
            >
              <img
                src={item}
                alt=""
                style={{ height: `${height}px`, ...style }}
              />
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
