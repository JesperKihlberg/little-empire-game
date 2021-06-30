import React from "react";
import { transformPointIsometric, IPoint } from "../helpers/transformPoint";
import { IMapBounds } from "./Map";

interface IMapGridProps {
  mapBounds: IMapBounds;
  drawBounds: IMapBounds;
  zoomLevel: number;
  gridDistance?: number;
  transformPoint?: (point: IPoint) => IPoint;
}

const IsometricMapGrid: React.FunctionComponent<IMapGridProps> = ({
  gridDistance = 50,
  transformPoint = transformPointIsometric,
  ...props
}) => {
  const zoomGridDistance = props.zoomLevel * gridDistance;
  const startPoint = { x: 0, y: 0 };
  const point1 = transformPoint({ x: props.mapBounds.x, y: props.mapBounds.y });
  const point2 = transformPoint({
    x: props.mapBounds.x,
    y: props.mapBounds.y + props.mapBounds.width,
  });
  const point3 = transformPoint({
    x: props.mapBounds.x + props.mapBounds.height,
    y: props.mapBounds.y + props.mapBounds.width,
  });
  const point4 = transformPoint({
    x: props.mapBounds.x + props.mapBounds.height,
    y: props.mapBounds.y,
  });
  return (
    <>
      {[...Array(1 + Math.round(props.mapBounds.width / zoomGridDistance))].map((_, i) => {
        const startPoint = transformPoint({ x: props.mapBounds.x, y: props.mapBounds.y + i * zoomGridDistance });
        const endPoint = transformPoint({ x: props.mapBounds.x + props.mapBounds.height, y: props.mapBounds.y + i * gridDistance });

        return (
          <line
            key={startPoint.x + "-" + startPoint.y}
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            style={{ stroke: "#333" }}
          />
        );
      })}
      {[...Array(1 + Math.round(props.mapBounds.height / zoomGridDistance))].map((_, i) => {
        const startPoint = transformPoint({ x: props.mapBounds.x + i * zoomGridDistance, y: props.mapBounds.y });
        const endPoint = transformPoint({ x: props.mapBounds.x + i * zoomGridDistance, y: props.mapBounds.y + props.mapBounds.width });

        return (
          <line
            key={startPoint.x + "-" + startPoint.y}
            x1={startPoint.x}
            y1={startPoint.y}
            x2={endPoint.x}
            y2={endPoint.y}
            style={{ stroke: "#0ff" }}
          />
        );
      })}
      {/* <line x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} style={{ stroke: "#ff0" }} />
      <line x1={point2.x} y1={point2.y} x2={point3.x} y2={point3.y} style={{ stroke: "#ff0" }} />
      <line x1={point3.x} y1={point3.y} x2={point4.x} y2={point4.y} style={{ stroke: "#ff0" }} />
      <line x1={point4.x} y1={point4.y} x2={point1.x} y2={point1.y} style={{ stroke: "#ff0" }} /> */}
    </>
  );
};
// <line
//   x1={props.mapBounds.x}
//   y1={props.mapBounds.y}
//   x2={gridDistance / Math.tan(-0.523598776)}
//   y2={gridDistance}
//   style={{ stroke: "#333" }}
// />

export default IsometricMapGrid;
