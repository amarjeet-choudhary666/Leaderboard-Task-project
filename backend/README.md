# Leaderboard Task API - Backend

This is the backend service for the Leaderboard Task project, built using the [NestJS](https://nestjs.com/) framework. It provides RESTful APIs and real-time communication capabilities to support user management, leaderboard functionality, and claim processing.

## Technology Stack

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **MongoDB**: NoSQL database used for data persistence, accessed via Mongoose ODM.
- **Socket.IO**: Enables real-time, bidirectional communication between clients and the server using WebSockets.

## Main Modules

- **UsersModule**: Handles user registration, authentication, and profile management.
- **LeaderboardModule**: Manages leaderboard data, rankings, and related operations.
- **ClaimModule**: Processes claims related to rewards or achievements within the system.

## Features

- RESTful API endpoints for all core functionalities.
- Real-time updates and notifications via WebSocket using Socket.IO.
- CORS enabled for frontend development servers running on `http://localhost:5173` and `http://localhost:5174`.

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

- Development mode with hot reload:

```bash
npm run start:dev
```

- Production mode:

```bash
npm run start:prod
```

The backend server listens on port `3000` by default or the port specified in the `PORT` environment variable.

### Testing

- Run unit tests:

```bash
npm run test
```

- Run end-to-end tests:

```bash
npm run test:e2e
```

- Generate test coverage report:

```bash
npm run test:cov
```

## License

This project is licensed under the MIT License.
