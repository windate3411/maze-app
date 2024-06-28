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
  const [startCell, setStartCell] = useState<MazeCell | null>(null);
  const [endCell, setEndCell] = useState<MazeCell | null>(null);
  const [solutionPath, setSolutionPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const resetMazeState = () => {
    setMaze(createInitialMaze(width, height));
    setSolutionPath([]);
    setStartCell(null);
    setEndCell(null);
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
    setStartCell(newMaze[start.y][start.x]);
    setEndCell(newMaze[end.y][end.x]);
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

  const solveMaze = () => {
    if (!startCell || !endCell) {
      alert("Please generate a maze first!");
      return;
    }

    const queue: { x: number; y: number; path: { x: number; y: number }[] }[] =
      [
        {
          x: startCell.x,
          y: startCell.y,
          path: [{ x: startCell.x, y: startCell.y }],
        },
      ];
    const visited: boolean[][] = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );

    const findSolution = () => {
      while (queue.length > 0) {
        const { x, y, path } = queue.shift()!;
        if (visited[y][x]) continue;

        visited[y][x] = true;

        if (x === endCell.x && y === endCell.y) {
          // only start the animation if a solution is finalized
          animateSolutionPath(path);
          return;
        }

        getNeighbors(y, x, maze).forEach(({ x: nextX, y: nextY }) => {
          if (!visited[nextY][nextX]) {
            queue.push({
              x: nextX,
              y: nextY,
              path: [...path, { x: nextX, y: nextY }],
            });
          }
        });
      }
      alert("No solution found!");
    };

    const animateSolutionPath = (path: { x: number; y: number }[]) => {
      setIsAnimating(true);
      path.forEach((_, index) => {
        setTimeout(() => {
          setSolutionPath(path.slice(0, index + 1));
          if (index === path.length - 1) {
            setIsAnimating(false);
          }
        }, 10 * index);
      });
    };

    findSolution();
  };

  const getNeighbors = (y: number, x: number, maze: Maze) => {
    const neighbors: { x: number; y: number }[] = [];

    if (y > 0 && !maze[y][x].walls.top) {
      neighbors.push({ x, y: y - 1 });
    }

    if (x < width - 1 && !maze[y][x].walls.right) {
      neighbors.push({ x: x + 1, y });
    }

    if (y < height - 1 && !maze[y][x].walls.bottom) {
      neighbors.push({ x, y: y + 1 });
    }

    if (x > 0 && !maze[y][x].walls.left) {
      neighbors.push({ x: x - 1, y });
    }

    return neighbors;
  };

  return {
    maze,
    generateMaze,
    solutionPath,
    solveMaze,
    isAnimating,
  };
};
