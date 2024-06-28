import React from "react";
import { MazeCell } from "../types/Maze";

interface MazeProps {
  maze: MazeCell[][];
}

export const Maze: React.FC<MazeProps> = ({ maze }) => {
  return (
    <div className="grid grid-cols-20">
      {maze.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`cell-${x}-${y}`}
            className={`w-5 h-5  border-[#DD2244] box-border border ${
              !cell.walls.top ? "border-t-0" : ""
            } ${!cell.walls.right ? "border-r-0" : ""} ${
              !cell.walls.bottom ? "border-b-0" : ""
            } ${!cell.walls.left ? "border-l-0" : ""}`}
          >
            {cell.isStart && (
              <div className="text-xs w-full h-full grid place-items-center bg-green-500">
                S
              </div>
            )}
            {cell.isEnd && (
              <div className="text-xs w-full h-full grid place-items-center bg-red-500">
                E
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
