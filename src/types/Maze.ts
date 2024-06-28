export interface WallInfo {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface MazeCell {
  x: number;
  y: number;
  walls: WallInfo;
  visited: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

export type Maze = MazeCell[][];
