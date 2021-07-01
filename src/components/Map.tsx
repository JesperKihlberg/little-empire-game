import React, { useState } from "react";
import MapGrid from "./IsometricMapGrid";
interface IMapProps {
  dependencies?:{

  }
}
export interface IMapBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Map: React.FunctionComponent<IMapProps> = (props) => {
  const zoomLevels = [0.1, 0.5, 1, 2, 3, 4, 5, 10];

  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 1000,
    height: 400,
  });
  const mapBounds = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };
  const moveStart = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    console.log("moveStart");
    
    setDragging(true);
  };
  const move = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    if (dragging) {
      setBounds({
        ...bounds,
        x: (bounds.x) - target.movementX * zoomLevels[zoomLevel],
        y: (bounds.y) - target.movementY * zoomLevels[zoomLevel],
      });
    }
  };
  const moveStop = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setDragging(false);
  };
  const zoom = (event: any): void => {
    console.log(event);
    if (event.deltaY < 0) setZoomLevel(Math.max(zoomLevel - 1, 0));
    if (event.deltaY > 0) setZoomLevel(Math.min(zoomLevel + 1, zoomLevels.length - 1));
  };

  const zoomWidth = zoomLevels[zoomLevel] * bounds.width;
  const zoomHeight = zoomLevels[zoomLevel] * bounds.height;
  return (
    <svg
      width="100%"
      height="100%"
      onMouseDown={moveStart}
      onMouseMove={move}
      onMouseUp={moveStop}
      onMouseLeave={moveStop}
      onWheel={zoom}
      
      style={{ backgroundColor: "#9cc2ff" }}
    >
      <MapGrid mapBounds={{ x: 0, y: 0, height: 10000, width: 10000 }} />
    </svg>
  );
};

export default Map;
