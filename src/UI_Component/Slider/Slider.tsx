import React, {
  CSSProperties,
  Dispatch,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./style/Slider.module.css";
import { Arrow, SmallArrow } from "../Icons";
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
  style?: CSSProperties;
  orientationAlbum?: boolean,
  noMargin?: boolean;
  imageNoBorder?: boolean;
  setState?: Dispatch<React.SetStateAction<string | undefined>>
}> = ({ list, style, width, height, noMargin, orientationAlbum, imageNoBorder, setState }) => {
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

  const handleWheelEvent = (e: React.WheelEvent<HTMLDivElement>) => {
    const deltaY = e.deltaY;
    const direction = deltaY > 0 ? -1 : 1;
    setOffset((prev) => {
      if (ref.current) {
        const newOffset = prev + direction * width;
        if (newOffset > 0) return 0;
        if (Math.abs(newOffset) > ref.current.clientWidth) return -ref.current.clientWidth - width;
        return newOffset;
      }
      return prev;
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
  const handleClickImage = (item: string) => {
    setState && setState(item)
  }
  const ultraRight = () => {
    if (ref.current) {
      if (orientationAlbum) {
        if (ref.current) {
          return maxWidth() + (offset - ref.current.clientHeight) + 20;
        }
        return maxWidth() - width + 20;
      }
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
  if (orientationAlbum) {
    return (
      <div className={classes.cardWrapperAlbum}>
        <button className={classes.buttonUp} onClick={handleLeftArrowClick}><SmallArrow /></button>
        <div
          className={classes.cardAlbum}
          ref={ref}
          style={{ width: `${width + 4}px`, maxWidth: `${width + 4}px` }}
        >

          <div
            onWheel={handleWheelEvent}
            className={classes.imagesWrapper}
            style={{
              transform: `translateY(${offset}px)`,
              gap: `${noMargin ? "0" : "7px"}`,
            }}
          >
            {list.map((item) => {
              const key = keyGenerate();
              return (
                <div
                  key={key}
                  className={imageNoBorder ? classes.imageWrapperNoBorder : classes.imageWrapper}
                  style={{
                    width: `${width + 4}px`,
                    height: `${width + 4}px`,
                  }}
                  onClick={() => handleClickImage(item)}
                >
                  <img
                    src={item}
                    alt=""
                    style={{ height: `${height}px`, borderRadius: "10px", width: `${width}px`, objectFit: "cover", ...style }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button className={classes.buttonDown} onClick={handleRightArrowClick}><SmallArrow /></button>
      </div>
    );
  }
  return (
    <div
      className={classes.cardWrapper}
      ref={ref}
      style={{ margin: `${getMargin()}` }}
    >
      <div
        className={classes.imagesWrapper}
        onWheel={handleWheelEvent}
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
              className={imageNoBorder ? classes.imageWrapperNoBorder : classes.imageWrapper}
              style={{
                width: `${width}px`,
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
