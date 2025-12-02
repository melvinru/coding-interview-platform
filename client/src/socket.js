import { io } from 'socket.io-client';

// Connect to the server
// Assuming server runs on port 3001 locally
const URL = 'http://localhost:3001';

export const socket = io(URL);
