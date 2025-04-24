// src/pages/LegacyGame.js
import React from 'react';

export default function Read() {
    return (
        <div style={{ height: "100vh" , width : "100%" }}>
            <iframe 
                src="/kids-game/index2.html" 
                title="Kids Game" 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    marginLeft: '0', 
                }}
            />
        </div>
    );
}
