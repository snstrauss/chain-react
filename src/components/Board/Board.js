import React, { useContext } from 'react';
import { GameContext } from '../../context/GameProvider';
import Cell from '../Cell/Cell';
import S from './Board.module.scss';

export default function Board() {

    const { state: { board } } = useContext(GameContext);

    return (
        <div className={S.container}>
            board:
            {
                board.map((column, rowIdx) => (
                    <div key={`row-${rowIdx}`} className={S.row}>
                        {
                            column.map((cell) => (
                                <Cell key={`cell[${cell.row}/${cell.column}]`} cell={cell} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    );
}
