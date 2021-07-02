import React, { useState } from "react";
import Map, { IMapBounds } from "./Map";

interface IMapContainerProps {
  dependencies?: {
    eventHandlers?: {
      onMouseDown?: () => void;
      onMouseMove?: () => void;
      onMouseUp?: () => void;
      onMouseLeave?: () => void;
      onWheel?: () => void;
      onDoubleClick?: () => void;
    };
    viewboxProvider?:{

    }
  };
}
const defaultDependencies = {
  eventHandlers: {
    // onMouseDown: console.log,
    // onMouseMove: console.log,
    // onMouseUp: console.log,
    // onMouseLeave: console.log,
    onWheel: console.log,
    onDoubleClick: console.log,
    
  },
};
const MapContainer: React.FunctionComponent<IMapContainerProps> = ({ dependencies = defaultDependencies, ...props }) => {
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
  const onMouseDown = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setDragging(true);
  };
  const onMouseMove = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    if (dragging) {
      setBounds({
        ...bounds,
        x: bounds.x - target.movementX * zoomLevels[zoomLevel],
        y: bounds.y - target.movementY * zoomLevels[zoomLevel],
      });
    }
  };
  const onMouseUp = (target: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setDragging(false);
  };
  const onWheel = (event: any): void => {
    console.log(event);
    if (event.deltaY < 0) setZoomLevel(Math.max(zoomLevel - 1, 0));
    if (event.deltaY > 0) setZoomLevel(Math.min(zoomLevel + 1, zoomLevels.length - 1));
  };
// console.log(props);

  const zoomWidth = zoomLevels[zoomLevel] * bounds.width;
  const zoomHeight = zoomLevels[zoomLevel] * bounds.height;
  const mapProps = {
    ...props,
    dependencies
  };
  return <Map {...mapProps} />;
};

export default MapContainer;
