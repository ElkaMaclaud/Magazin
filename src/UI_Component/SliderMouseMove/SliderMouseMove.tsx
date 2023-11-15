import React, { FC, useState, useRef, MouseEvent, CSSProperties } from "react";
import classes from "./style/SliderMouseMove.module.css";

export const SliderMouseMove: FC<{
  images: Array<string>;
  size?: number;
}> = ({ images, size }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prevMouseX = useRef<number>(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    //const movementSpeed = 2;
    //const deltaX = (event.movementX || event.movementX || 0) * movementSpeed;
    const currentMouseX = event.clientX;
    const direction = currentMouseX > prevMouseX.current ? "right" : "left";
    const difference = currentMouseX - prevMouseX.current;
    const sizeX = size || 270;
    if (Math.abs(difference) >= sizeX / 7) {
      if (direction === "right") {
        setOffset((prev) => {
          if (prev < sizeX * 4) {
            return prev + sizeX;
          }
          return prev;
        });
      } else {
        setOffset((prev) => {
          if (prev > 0) {
            return prev - sizeX;
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
    width: `${size || 270}px`,
    maxWidth: `${size || 270}px`,
    maxHeight: `${size || 270}px`,
  };
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
              <div className={classes.dot}></div>
            </div>
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
