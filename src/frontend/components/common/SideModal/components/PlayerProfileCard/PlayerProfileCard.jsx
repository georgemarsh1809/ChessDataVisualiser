import React from 'react'
import styles from './PlayerProfileCard.module.css'
import { useStore } from '../../../../../stateManagement/store';

export const PlayerProfileCard = (props) => {

    const { children, data } = props
    const { toggleSideModal } = useStore()
    const setPlayerProfile = useStore((state) => state.setPlayerProfile)

    function getLastNameFromData(playerFullName) {
        const splitName = playerFullName.split(" ")
        const lastName = splitName[splitName.length - 1]
        return lastName
    }

    return (
        <button className={styles.playerProfileCard}
            onClick={
                () => {
                    // Some profile data load function
                    // console.log(getLastNameFromData(data))
                    setPlayerProfile(getLastNameFromData(data))
                    toggleSideModal()
                }
            }>
            {children}
        </button>
    )
}
