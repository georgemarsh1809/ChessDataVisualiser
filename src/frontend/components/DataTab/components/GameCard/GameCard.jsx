import React, { useState, useEffect } from 'react'
import styles from "./GameCard.module.css";
import { useStore } from '../../../../stateManagement/store';

export const GameCard = (props) => {

    const { data, index } = props

    const { currentGameMoves, pageNumber, gameId, setMoveNumber, setCurrentPosition } = useStore()
    const setGameId = useStore((state) => state.setGameId)
    const setCurrentGameMoves = useStore((state) => state.setCurrentGameMoves)
    const setCurrentGameHeader = useStore((state) => state.setCurrentGameHeader)

    const opponent = data["opponent"]
    const location = data["location"]
    const event = data["event"]
    const year = data["year"]
    const result = data["result"]
    // const id = data["id"]
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

    useEffect(() => {
        const getGameMovesById = async () => {
            const res = await fetch(
                "http://localhost:3000/get-moves?" +
                new URLSearchParams({
                    id: gameId,
                }).toString(),
                {
                    method: "GET",
                }
            );

            const resData = await res.json();
            // console.log("🚀 ~ getData ~ totalGame_resData:", resData);
            setCurrentGameMoves(
                String(resData[0]["lines"])
            );
            console.log(String(resData[0]["lines"]))

        };
        getGameMovesById()
    }, [gameId])


    return (
        <div className={`${styles.gameCard} `}>
            {/* <p>{JSON.stringify(data)}</p> */}
            <p>{calculateGameNumber(gameIndex)} | Opponent: {opponent} | Location: {location} | Event: {event} | Year: {year} | Result: {result}</p>
            <button className={styles.openGameButton} onClick={() => {
                setGameId(data.id)
                formatCurrentGameHeader(gameIndex, data.opponent, data.location, data.year)
                setCurrentPosition("")
                setMoveNumber(0)
                // console.log(currentGameMoves)
            }}>
                <i className="fa-solid fa-up-right-from-square"></i>
            </button>
        </div>
    )
}
