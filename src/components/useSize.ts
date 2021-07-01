import useResizeObserver from "@react-hook/resize-observer";
import React from "react";

export interface ISize {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export const useSize = (target: React.MutableRefObject<any>): ISize | undefined => {
  const [size, setSize] = React.useState<ISize>();

  React.useLayoutEffect(() => {
    setSize(target?.current?.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry: any) => setSize(entry.contentRect));
  return size;
};
