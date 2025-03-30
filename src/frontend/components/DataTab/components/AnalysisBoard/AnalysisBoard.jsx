import React, { useState, useMemo, useRef, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import styles from './AnalysisBoard.module.css'
import commonStyles from '../../../common/CommonStyles.module.css';


export const AnalysisBoard = () => {

    // const engine = useMemo(() => new Fish.Engine(), []);
    const game = useMemo(() => new Chess(), []);
    const inputRef = useRef < HTMLInputElement > (null);
    const [chessBoardPosition, setChessBoardPosition] = useState(game.fen());
    const [positionEvaluation, setPositionEvaluation] = useState(0);
    const [depth, setDepth] = useState(10);
    const [bestLine, setBestline] = useState("");
    const [possibleMate, setPossibleMate] = useState("");

    // function findBestMove() {
    //     engine.evaluatePosition(chessBoardPosition, 18);
    //     engine.onMessage(({
    //         positionEvaluation,
    //         possibleMate,
    //         pv,
    //         depth
    //     }) => {
    //         if (depth && depth < 10) return;
    //         positionEvaluation && setPositionEvaluation((game.turn() === "w" ? 1 : -1) * Number(positionEvaluation) / 100);
    //         possibleMate && setPossibleMate(possibleMate);
    //         depth && setDepth(depth);
    //         pv && setBestline(pv);
    //     });
    // }

    function onDrop(sourceSquare, targetSquare, piece) {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1].toLowerCase() ?? "q"
        });
        setPossibleMate("");
        setChessBoardPosition(game.fen());

        // illegal move
        if (move === null) return false;
        // engine.stop();
        setBestline("");
        if (game.game_over() || game.in_draw()) return false;
        return true;
    }

    // useEffect(() => {
    //     if (!game.game_over() || game.in_draw()) {
    //         findBestMove();
    //     }
    // }, [chessBoardPosition]);

    // const bestMove = bestLine?.split(" ")?.[0];

    // const handleFenInputChange = e => {
    //     const {
    //         valid
    //     } = game.validate_fen(e.target.value);
    //     if (valid && inputRef.current) {
    //         inputRef.current.value = e.target.value;
    //         game.load(e.target.value);
    //         setChessBoardPosition(game.fen());
    //     }
    // };
    return (
        <div className={styles.chessBoardContainer}>
            {/* <h4>
                Position Evaluation:{" "}
                {possibleMate ? `#${possibleMate}` : positionEvaluation}
                {"; "}
                Depth: {depth}
            </h4> */}

            {/* <h5>
                Best line: <i>{bestLine.slice(0, 40)}</i> ...
            </h5> */}

            {/* <input ref={inputRef} style={{

                width: "90%"
            }} onChange={handleFenInputChange} placeholder="Paste FEN to start analysing custom position" /> */}

            <Chessboard id="AnalysisBoard" position={chessBoardPosition} onPieceDrop={onDrop} customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
            }}
            // customArrows={bestMove ? [[(bestMove.substring(0, 2)), (bestMove.substring(2, 4)), "rgb(0, 128, 0)"]] : undefined} 
            />
            <button onClick={() => {
                // setPossibleMate("");
                // setBestline("");
                game.reset();
                setChessBoardPosition(game.fen());
            }}>
                reset
            </button>
        </div>
    );


}