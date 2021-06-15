export const DIRECTIONS = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
} as const;

interface DIRECTION {
  x: number;
  y: number;
}

export default DIRECTION;
