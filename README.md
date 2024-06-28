# Maze App

This project implements a maze generator and solver using React and Firebase. It provides a visual representation of the maze, where users can generate new mazes, solve them, and view the solution path animated step-by-step. The project also integrates Firebase Firestore to save and retrieve generated mazes.

## Features

- **Generate Maze:** Dynamically create mazes with variable start and end points.
- **Solve Maze:** Solve the generated mazes using a breadth-first search algorithm.
- **Animation:** Visualize the pathfinding algorithm with an animated solution path.
- **Firebase Integration:** Save and load mazes to and from Firebase Firestore.

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- Firebase Firestore

## Live Demo Link

https://maze-app-gamma.vercel.app/

## Project Setup

### Prerequisites

- Node.js
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/windate3411/maze-app.git
cd maze-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up Firebase:**

- Create a Firebase project in the Firebase console.
- Add your Firebase project credentials to .env.local

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

4. **Run the development server:**

```bash
npm run dev
```
