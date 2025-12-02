import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket';
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';

const LANGUAGES = [
    { name: 'javascript', version: '18.15.0' },
    { name: 'python', version: '3.10.0' },
    { name: 'java', version: '15.0.2' },
    { name: 'c++', version: '10.2.0', alias: 'cpp' },
    { name: 'go', version: '1.16.2' },
];

const Room = () => {
    const { id: roomId } = useParams();
    const [code, setCode] = useState('// Start coding here...');
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        socket.emit('join-room', roomId);

        socket.on('code-update', (newCode) => {
            setCode(newCode);
        });

        socket.on('language-update', (newLang) => {
            setLanguage(newLang);
        });

        return () => {
            socket.off('code-update');
            socket.off('language-update');
        };
    }, [roomId]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        socket.emit('language-change', { roomId, language: newLang });
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput('Running...');

        if (language === 'python') {
            try {
                if (!window.pyodide) {
                    setOutput('Loading Python runtime...');
                    window.pyodide = await loadPyodide();
                }

                // Capture stdout
                window.pyodide.setStdout({ batched: (msg) => setOutput(prev => prev + msg + '\n') });
                // Reset output before run
                setOutput('');

                await window.pyodide.runPythonAsync(code);
            } catch (error) {
                setOutput('Error executing Python code: ' + error.message);
            } finally {
                setIsRunning(false);
            }
            return;
        }

        try {
            // Use the server's execute endpoint to avoid CORS issues with Piston directly if any,
            // and to centralize logic.
            const response = await axios.post('http://localhost:3001/execute', {
                language: language === 'c++' ? 'cpp' : language, // Piston uses 'cpp'
                code
            });

            const result = response.data.run;
            setOutput(result.output || result.stderr || 'No output');
        } catch (error) {
            setOutput('Error executing code: ' + error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <div style={{ padding: '10px', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ marginRight: '10px' }}>Room: {roomId}</span>
                    <button onClick={copyLink}>Share Link</button>
                </div>
                <div>
                    <select value={language} onChange={handleLanguageChange} style={{ marginRight: '10px', padding: '5px' }}>
                        {LANGUAGES.map((lang) => (
                            <option key={lang.name} value={lang.name}>{lang.name}</option>
                        ))}
                    </select>
                    <button onClick={runCode} disabled={isRunning} style={{ padding: '5px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                        {isRunning ? 'Running...' : 'Run Code'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 2, borderRight: '1px solid #333' }}>
                    <CodeEditor
                        socket={socket}
                        roomId={roomId}
                        language={language}
                        code={code}
                        setCode={setCode}
                    />
                </div>
                <div style={{ flex: 1, backgroundColor: '#1e1e1e', color: '#ddd', padding: '10px', overflowY: 'auto', fontFamily: 'monospace' }}>
                    <h3>Output:</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default Room;
