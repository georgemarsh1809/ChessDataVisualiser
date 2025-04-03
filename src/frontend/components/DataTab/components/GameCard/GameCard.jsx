import React, { useState } from 'react'
import styles from "./GameCard.module.css";
import { useStore } from '../../../../stateManagement/store';

export const GameCard = (props) => {

    const { children, data, index } = props

    const { currentGameMoves, pageNumber } = useStore()
    const setGameId = useStore((state) => state.setGameId)
    const setCurrentGameMoves = useStore((state) => state.setCurrentGameMoves)
    const setCurrentGameHeader = useStore((state) => state.setCurrentGameHeader)

    const opponent = data["opponent"]
    const location = data["location"]
    const event = data["event"]
    const year = data["year"]
    const result = data["result"]
    const id = data["id"]
    const gameIndex = index
    // ${gameCardSelected == ? styles.gameCardSelected : ""}

    const calculateGameNumber = (gameIndex) => {
        let gameNumber;
        if (((gameIndex + 1) + (pageNumber - 1) * 10) < 10) {
            gameNumber = "00" + ((gameIndex + 1) + (pageNumber - 1) * 10)
            // gameNumber = 111
        } else {
            if (((gameIndex + 1) + (pageNumber - 1) * 10) < 100) {
                gameNumber = "0" + ((gameIndex + 1) + (pageNumber - 1) * 10)
            } else {
                gameNumber = ((gameIndex + 1) + (pageNumber - 1) * 10)
            }
        }
        return gameNumber
    }

    const formatCurrentGameHeader = (index, opp, location, year) => {
        // console.log("Game data:", data)
        setCurrentGameHeader("Game " + (calculateGameNumber(index)) + " | " + opp + ", " + location + ", " + year)
    }

    return (
        <div className={`${styles.gameCard} `}>
            {/* <p>{JSON.stringify(data)}</p> */}
            <p>{calculateGameNumber(gameIndex)} | Opponent: {opponent} | Location: {location} | Event: {event} | Year: {year} | Result: {result}</p>
            {children}
            <button className={styles.openGameButton} onClick={() => {
                // some game load function
                setGameId(data.id)
                setCurrentGameMoves(currentGameMoves)
                formatCurrentGameHeader(gameIndex, data.opponent, data.location, data.year)
                console.log(currentGameMoves)

                // loadChessGame(gameData.id)
            }}>
                <i className="fa-solid fa-up-right-from-square"></i>
            </button>
        </div>
    )
}
