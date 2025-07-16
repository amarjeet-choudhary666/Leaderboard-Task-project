# Leaderboard Task Frontend

This is the frontend application for the Leaderboard Task project, built using React and Vite. It provides a user interface to interact with the backend services, displaying user data, leaderboards, and claim history with real-time updates.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool and development server.
- **Socket.IO (socket.js)**: Enables real-time, bidirectional communication with the backend.

## Main Components

- **UserSelector**: Allows selection and management of users.
- **Leaderboard**: Displays the leaderboard rankings and scores.
- **ClaimButton**: Interface for users to claim rewards or achievements.
- **ClaimHistory**: Shows the history of claims made by users.

## Features

- Interactive and responsive UI built with React components.
- Real-time updates using WebSocket communication via socket.js.
- Integration with backend REST APIs and WebSocket services.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- Start the development server with hot module replacement:

```bash
npm run dev
```

- Build the application for production:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

### Testing

- Run frontend tests (if configured):

```bash
npm run test
```

## License

This project is licensed under the MIT License.
