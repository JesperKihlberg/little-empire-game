export interface IPoint {
  x: number;
  y: number;
}

export const transformPointIsometric = (point: IPoint) => {
  return { x: point.x - point.y, y: (point.x + point.y) / 2 };
};
