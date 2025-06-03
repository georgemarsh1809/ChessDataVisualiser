import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styles from "./AnalysisBoard.module.css";
import commonStyles from "../../../common/CommonStyles.module.css";
import { useStore } from "../../../../stateManagement/store";

export const AnalysisBoard = () => {
    const {
        currentGameMoves,
        moveNumber,
        setMoveNumber,
        setCurrentPosition,
    } = useStore();
    const [game, setGame] = useState(new Chess());

    useEffect(() => {
        const regexp = /\d+\. [\w-+]+ *[\w-+]*/g;

        const wholeMoves = currentGameMoves.matchAll(regexp);
        const newMoves = [];
        for (const [move] of wholeMoves) {
            const [moveString, firstHalfMove, secondHalfMove] = move.split(" ");
            const pgnMoveNumber = parseInt(moveString.slice(0, -1));
            if (pgnMoveNumber * 2 - 1 <= moveNumber) {
                newMoves.push(moveString);
                newMoves.push(firstHalfMove);
            }

            if (pgnMoveNumber * 2 <= moveNumber) {
                newMoves.push(secondHalfMove);
            }
        }

        const newPgn = newMoves.join(" ");
        setCurrentPosition(newPgn);

        try {
            game.loadPgn(newPgn);
        } catch (err) {
            console.log(err);
        }
    }, [moveNumber]);

    return (
        <div className={styles.chessBoardContainer}>
            <Chessboard
                id="AnalysisBoard"
                position={game.fen()}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
            />
            <button
                onClick={() => {
                    game.reset();
                    setMoveNumber(0);
                }}
            >
                Reset
            </button>
            <div className={styles.moveCounterContainer}>
                <button
                    className={styles.prevMoveButton}
                    onClick={() => {
                        moveNumber > 1 ? setMoveNumber(moveNumber - 1) : setMoveNumber(1);
                    }}
                >
                    <i className="fa-solid fa-chevron-left" />
                </button>
                <p className={styles.moveCounter}>Move: {moveNumber}</p>
                <button
                    className={styles.nextMoveButton}
                    onClick={() => {
                        setMoveNumber(moveNumber + 1);
                    }}
                >
                    <i className="fa-solid fa-chevron-right" />
                </button>
            </div>
        </div>
    );
};
