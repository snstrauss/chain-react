import React from 'react';
import GameProvider from './context/GameProvider';
import Game from './screens/Game/Game';
import './global.scss';

export default function App() {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
}
