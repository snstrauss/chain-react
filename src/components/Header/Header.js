import React, { useContext } from 'react';
import { GameContext } from '../../context/GameProvider';
import S from './Header.module.scss';

export default function Header() {

    const { state: gameState } = useContext(GameContext);

    return (
        <div className={S.container}>
            score: {gameState.score}
        </div>
    );
}
