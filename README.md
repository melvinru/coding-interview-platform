# Coding Interview Platform

A real-time collaborative coding interview platform built with React, Node.js, Socket.io, and Monaco Editor.

This project was developed as part of the **AI Development Tools Zoomcamp** course: [https://github.com/DataTalksClub/ai-dev-tools-zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp)

[Читать на русском](README_RU.md)

## Features

*   **Real-time Collaboration**: Multiple users can edit code simultaneously in the same room.
*   **Code Execution**: Run code directly in the browser.
    *   **Python**: Executed via Pyodide (WASM).
    *   **JavaScript, Java, C++, Go**: Executed via Piston API.
*   **Syntax Highlighting**: Powered by Monaco Editor.
*   **Room Management**: Unique shareable links for each interview session.

## Tech Stack

*   **Frontend**: React, Vite, Monaco Editor, Socket.io Client, Axios.
*   **Backend**: Node.js, Express, Socket.io.
*   **Testing**: Jest (Integration tests).
*   **Containerization**: Docker.

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/melvinru/coding-interview-platform.git
    cd coding-interview-platform
    ```

2.  Install dependencies:
    ```bash
    # Install root dependencies (concurrently)
    npm install

    # Install server dependencies
    cd server
    npm install
    cd ..

    # Install client dependencies
    cd client
    npm install
    cd ..
    ```

### Running the Application

To run both the client and server concurrently:

```bash
npm run dev
```

*   **Client**: [http://localhost:5173](http://localhost:5173)
*   **Server**: [http://localhost:3001](http://localhost:3001)

### Running Tests

To run integration tests for the server:

```bash
cd server
npm test
```

### Docker

To build and run the application using Docker:

```bash
docker build -t coding-interview-platform .
docker run -p 3001:3001 coding-interview-platform
```

## License

This project is open source and available under the [MIT License](LICENSE).
