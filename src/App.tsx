import React from "react";
import { Maze } from "./components/Maze";
import { useMaze } from "./hooks/useMaze";

const MazeApp: React.FC = () => {
  const { maze, generateMaze, solveMaze, solutionPath } = useMaze(20, 20);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#222a33]">
      <div className="flex gap-3 my-2 flex-wrap w-[400px] justify-center">
        <button
          onClick={generateMaze}
          className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded transition duration-300 ease-in-out min-w-[150px]"
        >
          Generate Maze
        </button>
        <button
          onClick={solveMaze}
          className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-gray-200 font-bold py-2 px-4 rounded transition duration-300 ease-in-out  min-w-[150px]"
        >
          Solve Maze
        </button>
      </div>
      <Maze maze={maze} solutionPath={solutionPath} />
    </div>
  );
};

export default MazeApp;
