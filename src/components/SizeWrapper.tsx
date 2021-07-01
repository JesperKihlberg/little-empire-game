import React, { useEffect } from "react";
import { ISize, useSize } from "./useSize";

interface ISizeWrapperProps {
  onSizeChanged?: (size: ISize | undefined) => void;
}

const SizeWrapper: React.FunctionComponent<ISizeWrapperProps> = ({ onSizeChanged, ...props }) => {
  const target = React.useRef(null);
  const size = useSize(target);
  useEffect(() => {
    onSizeChanged && onSizeChanged(size);
  }, [size]);
  return (
    <div ref={target} style={{ width: "100%", height: "100%" }}>
      {props.children}
    </div>
  );
};

export default SizeWrapper;
