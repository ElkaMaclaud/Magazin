import React, { FC, useState, useRef, MouseEvent, CSSProperties } from "react";
import classes from "./style/SliderMouseMove.module.css";

export const SliderMouseMove: FC<{
  images: Array<string>;
  size?: number;
}> = ({ images, size }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prevMouseX = useRef<number>(0);
  const sizeImg = size || 270;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    //const movementSpeed = 2;
    //const deltaX = (event.movementX || event.movementX || 0) * movementSpeed;
    const currentMouseX = event.clientX;

    // if (currentMouseX > 0) {

    // }
    const direction = currentMouseX > prevMouseX.current ? "right" : "left";
    const difference = currentMouseX - prevMouseX.current;

    if (Math.abs(difference) >= sizeImg / (images.length * 2)) {
      if (direction === "right") {
        setOffset((prev) => {
          if (prev < sizeImg * (images.length - 1)) {
            return prev + sizeImg;
          }
          return prev;
        });
      } else {
        setOffset((prev) => {
          if (prev > 0) {
            return prev - sizeImg;
          }
          return prev;
        });
      }
      prevMouseX.current = currentMouseX;
    }
  };
  const handleMouseOut = () => {
    setOffset(0);
  };
  //const debouncedHandleMouseMove = debounce(handleMouseMove, 60);
  const style: CSSProperties = {
    width: `${sizeImg}px`,
    maxWidth: `${sizeImg}px`,
    height: `${sizeImg * .92}px`,
  };
  const styleDot: CSSProperties = {
    width: `${sizeImg / 39}px`,
    height: `${sizeImg / 39}px`,
  };
  console.log(offset)
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.slider}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMouseMove}
        ref={ref}
        style={{ transform: `translateX(${-offset}px)`, ...style }}
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
                index * sizeImg === offset ? classes.dotActive : classes.dot
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
//   console.log("handleMouseMove", event.clientX);
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
