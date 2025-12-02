import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ socket, roomId, language, code, setCode }) => {

    const handleEditorChange = (value) => {
        setCode(value);
        socket.emit('code-change', { roomId, code: value });
    };

    return (
        <Editor
            height="80vh"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={handleEditorChange}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
            }}
        />
    );
};

export default CodeEditor;
