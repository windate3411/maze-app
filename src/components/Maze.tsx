import React from "react";

export interface MazeCell {
  x: number;
  y: number;
}

interface MazeProps {
  maze: MazeCell[][];
}

export const Maze: React.FC<MazeProps> = ({ maze }) => {
  return (
    <div className="grid grid-cols-20">
      {maze.map((row, y) =>
        row.map((_, x) => (
          <div
            key={`cell-${x}-${y}`}
            className={"w-5 h-5  border-[#DD2244] box-border border"}
          ></div>
        ))
      )}
    </div>
  );
};
