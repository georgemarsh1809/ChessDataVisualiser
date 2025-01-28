import React from 'react'
import { PlayerProfileCard } from './components/PlayerProfileCard/PlayerProfileCard'
import { useStore } from '../../../store';

export const SideModal = () => {

  const { showSideModal, toggleSideModal } = useStore()

  const playerList = ['Alexander Alekhine', 'Viswanathan Anand', 'Mikhail Botvinnik',
    'José Raúl Capablanca', 'Magnus Carlsen', 'Fabiano Caruana', 'Bobby Fischer', 'Garry Kasparov',
    'Paul Morphy', 'Hikarua Nakamura', 'Judit Polgár', 'Mikhail Tal']

  return (
    <div className={`side-modal-container ${showSideModal ? 'side-modal-container-open' : "side-modal-container-closed"}`}>
      <div className='side-modal-header'>
        <h2>Choose Profile</h2>
        <button className='menu-button' onClick={toggleSideModal}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <div className='top-players-section'>
        {playerList.map((player, playerIndex) => {
          return (
            <PlayerProfileCard key={playerIndex} onClick={() => {
              // Some profile data load function
            }} >
              <p>{player}</p>
            </PlayerProfileCard>
          )
        }
        )}

      </div>

    </div>
  )
}
