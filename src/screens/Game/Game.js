import React, { useContext, useEffect } from 'react';
import Board from '../../components/Board/Board';
import Header from '../../components/Header/Header';
import { GameContext } from '../../context/GameProvider';
import S from './Game.module.scss';

let chainInterval;
const STEP_DURATION = 500;
export default function Game() {

    const { state: { isRunning, cellsToTurn, phase, userInitiated }, methods: gameActions } = useContext(GameContext);


    useEffect(() => {
        gameActions.init();
    }, [gameActions]);

    useEffect(() => {
        if (cellsToTurn.length) {
            chainInterval = setTimeout(() => {
                gameActions.rotateCells();
            }, userInitiated ? 0 : STEP_DURATION)
        } else {
            clearTimeout(chainInterval);
            gameActions.stopChain();
        }
    }, [phase, isRunning, cellsToTurn.length, gameActions])

    const customStyle = {
        "--step-duration": STEP_DURATION + 'ms'
    }

    return (
        <div className={S.container} style={customStyle}>
            <Header />
            <Board />
        </div>
    );
}
