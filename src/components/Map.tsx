import React, { useState } from "react";
interface IMapProps {
  dependencies?: {
    eventHandlers?: {};
  };
  viewBox?: { x: number; y: number; width: number; height: number };
  // bounds: IMapBounds;
}
export interface IMapBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Map: React.FunctionComponent<IMapProps> = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      {...(props.dependencies && props.dependencies.eventHandlers)}
      viewBox={props.viewBox && props.viewBox.x + " " + props.viewBox.y + " " + props.viewBox.width + " " + props.viewBox.height}
      style={{ backgroundColor: "#9cc2ff" }}
    >
      {props.children}
    </svg>
  );
};

export default Map;
