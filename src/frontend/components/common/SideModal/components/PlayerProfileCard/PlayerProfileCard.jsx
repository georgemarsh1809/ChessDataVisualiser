import React from 'react'
import styles from './PlayerProfileCard.module.css'

export const PlayerProfileCard = (props) => {

    const { children } = props

    return (
        <button className={styles.playerProfileCard}>
            {children}
        </button>
    )
}
