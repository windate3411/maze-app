import { useState } from "react";
import { Maze, MazeCell } from "../types/Maze";

const createInitialMaze = (width: number, height: number): Maze => {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => ({
      x,
      y,
      walls: { top: true, right: true, bottom: true, left: true },
      visited: false,
    }))
  );
};

const getRandomEdgePosition = (width: number, height: number) => {
  const edges = ["top", "right", "bottom", "left"];
  const edge = edges[Math.floor(Math.random() * edges.length)];
  switch (edge) {
    case "top":
      return { x: Math.floor(Math.random() * width), y: 0 };
    case "right":
      return { x: width - 1, y: Math.floor(Math.random() * height) };
    case "bottom":
      return { x: Math.floor(Math.random() * width), y: height - 1 };
    case "left":
      return { x: 0, y: Math.floor(Math.random() * height) };
    default:
      return { x: 0, y: 0 };
  }
};

const removeWalls = (first: MazeCell, second: MazeCell) => {
  const xDiff = first.x - second.x;
  const yDiff = first.y - second.y;
  if (xDiff === 1) {
    first.walls.left = false;
    second.walls.right = false;
  } else if (xDiff === -1) {
    first.walls.right = false;
    second.walls.left = false;
  }
  if (yDiff === 1) {
    first.walls.top = false;
    second.walls.bottom = false;
  } else if (yDiff === -1) {
    first.walls.bottom = false;
    second.walls.top = false;
  }
};

export const useMaze = (width: number, height: number) => {
  const [maze, setMaze] = useState<Maze>(createInitialMaze(width, height));

  const resetMazeState = () => {
    setMaze(createInitialMaze(width, height));
  };

  const generateMaze = async () => {
    resetMazeState();
    const newMaze = createInitialMaze(width, height);

    const stack: MazeCell[] = [];
    const start = getRandomEdgePosition(width, height);
    newMaze[start.y][start.x].visited = true;
    newMaze[start.y][start.x].isStart = true;
    stack.push(newMaze[start.y][start.x]);

    while (stack.length) {
      const current = stack[stack.length - 1];
      const unvisitedNeighbors = getUnvisitedNeighbors(current, newMaze);

      if (unvisitedNeighbors.length > 0) {
        const next =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];
        removeWalls(current, next);
        next.visited = true;
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    const end = getRandomEdgePosition(width, height);
    newMaze[end.y][end.x].isEnd = true;

    setMaze(newMaze);
  };

  const getUnvisitedNeighbors = (cell: MazeCell, maze: Maze): MazeCell[] => {
    const { x, y } = cell;
    const neighbors = [];
    if (y > 0 && !maze[y - 1][x].visited) neighbors.push(maze[y - 1][x]);
    if (x < width - 1 && !maze[y][x + 1].visited)
      neighbors.push(maze[y][x + 1]);
    if (y < height - 1 && !maze[y + 1][x].visited)
      neighbors.push(maze[y + 1][x]);
    if (x > 0 && !maze[y][x - 1].visited) neighbors.push(maze[y][x - 1]);
    return neighbors;
  };

  return {
    maze,
    generateMaze,
  };
};
