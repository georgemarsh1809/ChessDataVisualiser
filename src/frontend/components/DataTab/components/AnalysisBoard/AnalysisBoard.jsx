import React, { useState, useMemo, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styles from './AnalysisBoard.module.css'
import commonStyles from '../../../common/CommonStyles.module.css';
import { useStore } from "../../../../stateManagement/store";


export const AnalysisBoard = () => {

    // const engine = useMemo(() => new Fish.Engine(), []);
    // const game = useMemo(() => new Chess(), []);
    const { currentGameMoves } = useStore();
    const [game, setGame] = useState(new Chess());
    const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
    const [positionEvaluation, setPositionEvaluation] = useState(0);


    useEffect(() => {

        try {
            game.loadPgn(currentGameMoves)

        } catch (err) {
            console.log(err)
        }

        const moveHandler = (direction) => {

        }



    }, [currentGameMoves])


    // loadGame()
    return (
        <div className={styles.chessBoardContainer}>

            <Chessboard id="AnalysisBoard" position={game.fen()} customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
            }}
            />
            <button onClick={() => {
                game.reset();
                setChessBoardPosition(game.fen());
            }}>
                reset
            </button>

        </div>
    );


}