import React from "react";
import { MazeCell } from "../types/Maze";

interface MazeProps {
  maze: MazeCell[][];
  solutionPath: { x: number; y: number }[];
}

export const Maze: React.FC<MazeProps> = ({ maze, solutionPath }) => {
  const isSolutionCell = (x: number, y: number) =>
    solutionPath.some((point) => point.x === x && point.y === y);

  const borderStyle = (cell: MazeCell, x: number, y: number) => {
    const mazeWidth = maze[0].length;
    const mazeHeight = maze[0].length;
    const isStartOrEndAtTop = (cell.isStart || cell.isEnd) && y === 0;
    const isStartOrEndAtRight =
      (cell.isStart || cell.isEnd) && x === mazeWidth - 1;
    const isStartOrEndAtBottom =
      (cell.isStart || cell.isEnd) && y === mazeHeight - 1;
    const isStartOrEndAtLeft = (cell.isStart || cell.isEnd) && x === 0;
    const borders = {
      top: cell.walls.top && !isStartOrEndAtTop ? "" : "border-t-0",
      right: cell.walls.right && !isStartOrEndAtRight ? "" : "border-r-0",
      bottom: cell.walls.bottom && !isStartOrEndAtBottom ? "" : "border-b-0",
      left: cell.walls.left && !isStartOrEndAtLeft ? "" : "border-l-0",
    };
    return `${borders.top} ${borders.right} ${borders.bottom} ${borders.left}`;
  };

  const arrowDirection = (
    cell: MazeCell,
    x: number,
    y: number,
    mazeWidth: number,
    mazeHeight: number
  ): string => {
    if (cell.isStart || cell.isEnd) {
      if ((y === 0 && cell.isStart) || (cell.isEnd && y === mazeHeight - 1))
        return "↓";
      if ((y === mazeHeight - 1 && cell.isStart) || (cell.isEnd && y === 0))
        return "↑";
      if ((x === 0 && cell.isStart) || (cell.isEnd && x === mazeWidth - 1))
        return "→";
      if ((x === mazeWidth - 1 && cell.isStart) || (cell.isEnd && x === 0))
        return "←";
    }
    return "";
  };
  return (
    <div className="grid grid-cols-20">
      {maze.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`cell-${x}-${y}`}
            className={`w-5 h-5  border-[#DD2244] box-border border ${borderStyle(
              cell,
              x,
              y
            )} ${isSolutionCell(x, y) ? "bg-[#32CD32]" : "bg-transparent"}`}
          >
            {(cell.isStart || cell.isEnd) && (
              <div className="text-xs w-full h-full grid place-items-center text-white">
                {arrowDirection(cell, x, y, maze[0].length, maze.length)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
