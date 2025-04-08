import React, { useState, useEffect } from "react";
import styles from "./GameCard.module.css";
import { useStore } from "../../../../stateManagement/store";

export const GameCard = ({ data, index: gameIndex }) => {
  const {
    currentGameMoves,
    pageNumber,
    gameId,
    setMoveNumber,
    setCurrentPosition,
    setGameId,
    setCurrentGameMoves,
    setCurrentGameHeader,
  } = useStore();

  const { opponent, location, event, year, result } = data;
  // const id = data["id"]
  // ${gameCardSelected == ? styles.gameCardSelected : ""}

  const calculateGameNumber = (gameIndex) => {
    let gameNumber;
    if (gameIndex + 1 + (pageNumber - 1) * 10 < 10) {
      gameNumber = "00" + (gameIndex + 1 + (pageNumber - 1) * 10);
      // gameNumber = 111
    } else {
      if (gameIndex + 1 + (pageNumber - 1) * 10 < 100) {
        gameNumber = "0" + (gameIndex + 1 + (pageNumber - 1) * 10);
      } else {
        gameNumber = gameIndex + 1 + (pageNumber - 1) * 10;
      }
    }
    return gameNumber;
  };

  const formatCurrentGameHeader = (index, opp, location, year) => {
    // console.log("Game data:", data)
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
      {/* <p>{JSON.stringify(data)}</p> */}
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
          // console.log(currentGameMoves)
        }}
      >
        <i className="fa-solid fa-up-right-from-square"></i>
      </button>
    </div>
  );
};
