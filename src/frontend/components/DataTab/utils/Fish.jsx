import React, { useEffect } from "react";

export const Fish = () => {
    useEffect(() => {
        const stockfish = new Worker("./stockfish.js");
        const DEPTH = 8; // number of halfmoves the engine looks ahead
        const FEN_POSITION =
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

        stockfish.postMessage("uci");
        stockfish.postMessage(`position fen ${FEN_POSITION}`);
        stockfish.postMessage(`go depth ${DEPTH}`);

        stockfish.onmessage = (e) => {
            console.log(e.data); // in the console output you will see `bestmove e2e4` message
        };
    }, []);

    class Engine {
        constructor() {
            this.stockfish = new Worker("./stockfish.js");
            this.onMessage = (callback) => {
                this.stockfish.addEventListener("message", (e) => {
                    const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

                    callback({ bestMove });
                });
            };
            // Init engine
            this.sendMessage("uci");
            this.sendMessage("isready");
        }

        evaluatePosition(fen, depth) {
            this.stockfish.postMessage(`position fen ${fen}`);
            this.stockfish.postMessage(`go depth ${depth}`);
        }
        stop() {
            this.sendMessage("stop"); // Run when changing positions
        }
        quit() {
            this.sendMessage("quit"); // Good to run this before unmounting.
        }
    }
}
