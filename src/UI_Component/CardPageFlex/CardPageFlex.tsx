import React, {
  FC,
  ReactNode,
  CSSProperties,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import classes from "./style/CardPageFlex.module.css";

export const CardPageFlex: FC<{
  children: ReactNode[] | ReactNode;
  maxWidth?: number;
  style?: CSSProperties;
}> = ({ children, style, maxWidth }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<CSSProperties>({
    left: 0,
    right: 0,
    width: 0,
    maxWidth: 0,
  });
  useLayoutEffect(() => {
    if (ref.current && refParent.current) {
      const width =
        refParent.current?.clientWidth - ref.current?.clientWidth - 30;
      const left =
        ref.current?.offsetLeft +            //.getBoundingClientRect().x
        ref.current?.clientWidth +
        30;
        const right = window.innerWidth - refParent.current?.clientWidth;
      setStyles(() => ({
        left: left,
        right: right,
        width: width,
        maxWidth: width,
      }));
    }
  }, []);
  if (Array.isArray(children)) {
    if (children.length === 3) {
      return (
        <div className={classes.wrapper}>
          <div
            style={{ maxWidth: `${maxWidth}px` }}
            className={classes.contentWrapper}
          >
            <div className={classes.contentHeader}>{children[0]}</div>
            <div ref={refParent} className={classes.content}>
              <div ref={ref} className={classes.leftContent} style={style}>
                {children[1]}
              </div>
              <div style={styles} className={classes.rightContent}>
                {children[2]}
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (children.length < 3) {
      return (
        <div className={classes.wrapper}>
          <div
            style={{ maxWidth: `${maxWidth}px` }}
            className={classes.contentWrapper}
          >
            <div className={classes.contentHeader}>{children[0]}</div>
            <div className={classes.contentOne}>{children[1] || null}</div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className={classes.wrapper} style={style}>
      <div className={classes.contentWrapperOne}>{children}</div>
    </div>
  );
};
