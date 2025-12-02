const io = require('socket.io-client');

describe('Socket.io Server', () => {
    let clientSocket;

    beforeAll((done) => {
        // Assuming server is running on port 3001 for tests, 
        // or we can start the server instance here. 
        // For simplicity in this homework context, we'll assume the server is started separately 
        // or we could import the app and start it.
        // Let's try to connect to the running server or a test instance.
        // Ideally, we should start the server programmatically here.
        clientSocket = io('http://localhost:3001');
        clientSocket.on('connect', done);
    });

    afterAll(() => {
        clientSocket.disconnect();
    });

    test('should join a room and receive code update', (done) => {
        const roomId = 'test-room';
        clientSocket.emit('join-room', roomId);

        clientSocket.on('code-update', (code) => {
            expect(code).toBeDefined();
            done();
        });
    });

    test('should sync code changes', (done) => {
        const roomId = 'test-room';
        const newCode = 'console.log("Hello Test");';

        // We need a second client to verify broadcast, 
        // but for this basic test we can check if the server acknowledges or just sends back to us 
        // (depending on implementation, my server sends to room excluding sender usually, 
        // but let's check the logic).
        // My server logic: socket.to(roomId).emit(...) -> sends to others.
        // So we need a second client.

        const client2 = io('http://localhost:3001');
        client2.on('connect', () => {
            client2.emit('join-room', roomId);
        });

        client2.on('code-update', (code) => {
            if (code === newCode) {
                client2.disconnect();
                done();
            }
        });

        // Wait a bit for client2 to join
        setTimeout(() => {
            clientSocket.emit('code-change', { roomId, code: newCode });
        }, 500);
    });
});
