const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Store room data: { roomId: { code: "...", language: "..." } }
const rooms = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        // Send current code to the new user if exists
        if (rooms[roomId]) {
            socket.emit('code-update', rooms[roomId].code);
            socket.emit('language-update', rooms[roomId].language);
        } else {
            // Initialize room if not exists
            rooms[roomId] = { code: '// Start coding here...', language: 'javascript' };
            socket.emit('code-update', rooms[roomId].code);
            socket.emit('language-update', rooms[roomId].language);
        }
    });

    socket.on('code-change', ({ roomId, code }) => {
        if (rooms[roomId]) {
            rooms[roomId].code = code;
        }
        socket.to(roomId).emit('code-update', code);
    });

    socket.on('language-change', ({ roomId, language }) => {
        if (rooms[roomId]) {
            rooms[roomId].language = language;
        }
        io.to(roomId).emit('language-update', language);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

// Piston API for code execution
app.post('/execute', async (req, res) => {
    const { language, code } = req.body;

    // Map our language names to Piston's runtime names if necessary
    // For now assuming they match or we handle mapping on client
    // Piston runtimes: https://emkc.org/api/v2/piston/runtimes

    try {
        const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
            language: language,
            version: "*",
            files: [
                {
                    content: code
                }
            ]
        });
        res.json(response.data);
    } catch (error) {
        console.error('Execution error:', error.message);
        res.status(500).json({ error: 'Failed to execute code' });
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
