import React from 'react'
import styles from "./GameCard.module.css";

export const GameCard = (props) => {

    const { children } = props
    return (
        <div className={styles.gameCard}>
            {children}
        </div>
    )
}
