import React, { FC, useState, useRef, MouseEvent, CSSProperties } from "react";
import classes from "./style/SliderMouseMove.module.css";
interface IOffset {
  value: number;
  begin: boolean;
}
export const SliderMouseMove: FC<{
  images: Array<string>;
  size?: number;
}> = ({ images, size }) => {
  const [offset, setOffset] = useState<IOffset>({ value: 0, begin: true });
  const ref = useRef<HTMLDivElement>(null);
  const prevMouseX = useRef<number>(0);
  const sizeImg = size || 270;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    //const movementSpeed = 2;
    //const deltaX = (event.movementX || event.movementX || 0) * movementSpeed;
    const currentMouseX = event.clientX;
    if (
      offset.value === 0 &&
      offset.begin === true &&
      ref.current &&
      currentMouseX - ref.current?.offsetLeft >= (sizeImg / (images.length * 2))
    ) {
      setOffset(() => {
        const index =
          images.length -
          Math.round(
            sizeImg /
              (currentMouseX - (ref.current ? ref.current?.offsetLeft : 1))
          );
        const valueIndex = index <= 0 ? 1 : index === 1 ? index + 1 : index;
        return {
          value: valueIndex * sizeImg,
          begin: false,
        };
      });
    }
    const direction = currentMouseX > prevMouseX.current ? "right" : "left";
    const difference = currentMouseX - prevMouseX.current;
    if (Math.abs(difference) >= sizeImg / ((images.length - 1) * 2)) {
      if (direction === "right") {
        setOffset((prev) => {
          if (prev.value < sizeImg * (images.length - 1)) {
            return { ...prev, value: prev.value + sizeImg };
          }
          return prev;
        });
      } else {
        setOffset((prev) => {
          if (prev.value > 0) {
            return { ...prev, value: prev.value - sizeImg };
          }
          return prev;
        });
      }
      prevMouseX.current = currentMouseX;
    }
  };
  const handleMouseOut = () => {
    setOffset(() => ({ value: 0, begin: true }));
  };
  //const debouncedHandleMouseMove = debounce(handleMouseMove, 60);
  const style: CSSProperties = {
    width: `${sizeImg}px`,
    maxWidth: `${sizeImg}px`,
    height: `${sizeImg * 0.92}px`,
  };
  const styleDot: CSSProperties = {
    width: `${sizeImg / 39}px`,
    height: `${sizeImg / 39}px`,
  };
  return (
    <div ref={ref} className={classes.wrapper}>
      <div
        className={classes.slider}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        style={{ transform: `translateX(${-offset.value}px)`, ...style }}
      >
        {images.map((img) => {
          const key = Math.random().toString(16);
          return (
            <div key={key} className={classes.imageWrapper}>
              <img src={img} alt="Фото техники" />
            </div>
          );
        })}
      </div>
      <div className={classes.dotWrapper}>
        {images.map((item, index) => {
          const key = Math.random().toString(16);
          return (
            <div
              style={styleDot}
              key={key}
              className={
                index * sizeImg === offset.value
                  ? classes.dotActive
                  : classes.dot
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

// const [indexImg, setIndexImg] = useState<number>(0);
// const ref = useRef<HTMLDivElement>(null);
// const prevMouseX = useRef<number>(0);
// const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
//   const currentMouseX = event.clientX;
//   const direction = currentMouseX > prevMouseX.current ? "right" : "left";
//   prevMouseX.current = currentMouseX;
//   setIndexImg((prev) => {
//     if (prev < images.length - 1) {
//       return (prev += 1);
//     }
//     return 0
//   });
// };
// return (
//   <div className={classes.wrapper}>
//     <div onMouseMove={handleMouseMove} ref={ref} className={classes.imageWrapper} style={style}>
//       <img src={images[indexImg]} alt="Фото техники" />
//     </div>
//   </div>
// );
