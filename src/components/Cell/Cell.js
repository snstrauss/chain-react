import React, { useContext } from 'react';
import { GameContext } from '../../context/GameProvider';
import S from './Cell.module.scss';

export default function Cell({ cell }) {

    const { methods: gameMethods } = useContext(GameContext);

    const cellStyle = {
        transform: `rotate(${cell.visualTurn}deg)`
    }

    function initiateChain() {
        gameMethods.initiateChain(cell);
    }

    return (
        <div className={S.container}>
            <div className={S.circle} style={cellStyle} onClick={initiateChain}>
                <div className={S.inner}>
                </div>
            </div>
        </div>
    );
}
