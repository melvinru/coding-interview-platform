import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const createRoom = () => {
        const id = uuidv4();
        navigate(`/room/${id}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1e1e1e', color: 'white' }}>
            <h1>Coding Interview Platform</h1>
            <button
                onClick={createRoom}
                style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer', backgroundColor: '#007acc', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Create New Interview Room
            </button>
        </div>
    );
};

export default Home;
