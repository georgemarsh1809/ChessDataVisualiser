import React from 'react'
import styles from "./GameCard.module.css";
import { useStore } from '../../../../stateManagement/store';

export const GameCard = (props) => {

    const { children, data, index } = props

    const { pageNumber } = useStore()

    console.log(data)

    const opponent = data["opponent"]
    const location = data["location"]
    const event = data["event"]
    const year = data["year"]
    const result = data["result"]
    const gameIndex = index

    return (
        <div className={styles.gameCard}>
            {/* <p>{JSON.stringify(data)}</p> */}
            <p>{(gameIndex + 1) + (pageNumber - 1) * 10} | Opponent: {opponent} | Location: {location} | Event: {event} | Year: {year} | Result: {result}</p>
            {children}
        </div>
    )
}
