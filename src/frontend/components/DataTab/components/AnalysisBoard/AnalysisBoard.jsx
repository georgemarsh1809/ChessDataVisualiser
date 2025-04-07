import React, { useState, useMemo, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styles from './AnalysisBoard.module.css'
import commonStyles from '../../../common/CommonStyles.module.css';
import { useStore } from "../../../../stateManagement/store";


export const AnalysisBoard = () => {

    // const engine = useMemo(() => new Fish.Engine(), []);
    // const game = useMemo(() => new Chess(), []);
    const { currentGameMoves, moveNumber, setMoveNumber, currentPosition, setCurrentPosition } = useStore();
    const [game, setGame] = useState(new Chess());
    const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
    const [positionEvaluation, setPositionEvaluation] = useState(0);

    let splitPgn = currentGameMoves.split(" ")

    // useEffect(() => {

    //     try {
    //         game.loadPgn(splitPgn)

    //     } catch (err) {
    //         console.log(err)
    //     }

    // }, [currentGameMoves])




    useEffect(() => {
        const newPgn = splitPgn.slice(0, 3 * moveNumber).join(' ')
        console.log(newPgn)
        setCurrentPosition(newPgn)

        try {
            game.loadPgn(newPgn)

        } catch (err) {
            console.log(err)
        }

    }, [moveNumber])


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
                setChessBoardPosition(game.fen(game.loadPgn(currentPosition)));
                setMoveNumber(0)
            }}>
                Reset
            </button>
            <div className={styles.moveCounterContainer}>
                <button className={styles.prevMoveButton} onClick={() => {
                    moveNumber > 1 ? setMoveNumber(moveNumber - 1) : setMoveNumber(1)
                }
                }>
                    <i className="fa-solid fa-chevron-left" />
                </button>
                <p className={styles.moveCounter}>Move: {moveNumber}</p>
                <button className={styles.nextMoveButton} onClick={() => {
                    setMoveNumber(moveNumber + 1)
                }
                }>
                    <i className="fa-solid fa-chevron-right" />
                </button>
            </div>

        </div>
    );


}