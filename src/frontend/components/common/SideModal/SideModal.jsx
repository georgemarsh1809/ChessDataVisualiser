import React from 'react'
import { PlayerProfileCard } from './components/PlayerProfileCard/PlayerProfileCard'
import { useStore } from '../../../stateManagement/store';
import commonStyles from '../../common/CommonStyles.module.css'
import styles from './SideModal.module.css'

export const SideModal = () => {

  const { showSideModal, toggleSideModal, setTab } = useStore()

  const playerList = ['✨ Alexander Alekhine', '✨ Viswanathan Anand', '✨ Mikhail Botvinnik',
    '✨ José Raúl Capablanca', '✨ Magnus Carlsen', '✨ Fabiano Caruana', '✨ Bobby Fischer', '✨ Garry Kasparov',
    '✨ Paul Morphy', '✨ Hikarua Nakamura', '✨ Judit Polgár', '✨ Mikhail Tal']

  return (
    <div className={`${styles.sideModalContainer} ${showSideModal ? styles.sideModalContainerOpen : ""}`}>
      <div className={styles.sideModalHeader}>
        <h2>Choose Profile</h2>
        <button className={commonStyles.menuButton} onClick={toggleSideModal}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <div className={styles.topPlayersSection}>
        {playerList.map((player, playerIndex) => {
          return (
            <PlayerProfileCard key={playerIndex} data={player} >
              <p>{player}</p>
            </PlayerProfileCard>
          )
        }
        )}

      </div>

    </div>
  )
}
