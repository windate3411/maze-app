import React, { useState } from "react";
import { Maze, MazeCell } from "./components/Maze";

const MazeApp: React.FC = () => {
  const [maze] = useState<MazeCell[][]>([
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  ]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#222a33]">
      <div className="flex gap-3 my-2 flex-wrap w-[400px] justify-center">
        <button className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded transition duration-300 ease-in-out min-w-[150px]">
          Generate Maze
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded transition duration-300 ease-in-out  min-w-[150px]">
          Solve Maze
        </button>
      </div>
      <Maze maze={maze} />
    </div>
  );
};

export default MazeApp;
