import React from "react";

interface IMapGridProps {
  width: number;
  height: number;
}
const MapGrid: React.FunctionComponent<IMapGridProps> = (props) => {
  return (
    <line x1="-5" y1="0" x2="160" y2="100" style={{ stroke: "#006600" }} />
  );
};

export default MapGrid;
