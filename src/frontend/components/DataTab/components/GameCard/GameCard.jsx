import React from "react";
import styles from "./GameCard.module.css";
import { useStore } from "../../../../stateManagement/store";

export const GameCard = ({ data, index: gameIndex }) => {
    const {
        pageNumber,
        setMoveNumber,
        setCurrentPosition,
        setGameId,
        setCurrentGameHeader,
    } = useStore();

    const { opponent, location, event, year, result } = data;

    const calculateGameNumber = (gameIndex) => {
        let gameNumber;
        if (gameIndex + 1 + (pageNumber - 1) * 10 < 10) {
            gameNumber = "00"
                + (gameIndex
                    + 1
                    + (pageNumber - 1) * 10);
        } else {
            if (gameIndex + 1 + (pageNumber - 1) * 10 < 100) {
                gameNumber = "0"
                    + (gameIndex
                        + 1
                        + (pageNumber - 1) * 10);
            } else {
                gameNumber = gameIndex
                    + 1
                    + (pageNumber - 1) * 10;
            }
        }
        return gameNumber;
    };

    const formatCurrentGameHeader = (index, opp, location, year) => {
        setCurrentGameHeader(
            "Game " +
            calculateGameNumber(index) +
            " | " +
            opp +
            ", " +
            location +
            ", " +
            year
        );
    };

    return (
        <div className={`${styles.gameCard} `}>
            <p>
                {calculateGameNumber(gameIndex)} | Opponent: {opponent} | Location:{" "}
                {location} | Event: {event} | Year: {year} | Result: {result}
            </p>
            <button
                className={styles.openGameButton}
                onClick={() => {
                    setGameId(data.id);
                    formatCurrentGameHeader(
                        gameIndex,
                        data.opponent,
                        data.location,
                        data.year
                    );
                    setCurrentPosition("");
                    setMoveNumber(0);
                }}
            >
                <i className="fa-solid fa-up-right-from-square"></i>
            </button>
        </div>
    );
};
