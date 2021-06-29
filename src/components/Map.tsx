import React, { useState } from "react";
import MapGrid from "./MapGrid";
interface IMapProps {}
const Map: React.FunctionComponent<IMapProps> = (props) => {
  // const width=50;
  // const height=20;
  const [dragging, setDragging] = useState(false);
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 1000,
    height: 400
  });
  return (
    <svg
      width="1000"
      height="400"
      viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
      onMouseDown={(target) => {
        setDragging(true);
        console.log("down", target);
      }}
      onMouseMove={(target) => {
        if (dragging) {
          setBounds({
            ...bounds,
            x: bounds.x - target.movementX,
            y: bounds.y - target.movementY
          });
        }
      }}
      onMouseUp={(target) => {
        setDragging(false);
        console.log("up", target);
      }}
      onMouseLeave={(target) => {
        setDragging(false);
        console.log("leave", target);
      }}
    >
      <rect
        id="background"
        width="50"
        height="20"
        style={{ fill: "rgb(0,0,255)" }}
        onClick={(target) => {
          console.log("rect", target);
        }}
      />
      <MapGrid width={bounds.width} height={bounds.height} />
    </svg>
  );
};

export default Map;
