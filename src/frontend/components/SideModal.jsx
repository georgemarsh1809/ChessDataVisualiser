import React from 'react'
import ProfileCard from './PlayerProfileCard'
import { HR } from "flowbite-react";

export default function SideModal(props) {

  const { showSideModal, handleSideModal } = props

  const playerList = ['Alexander Alekhine', 'Viswanathan Anand', 'Mikhail Botvinnik',
    'José Raúl Capablanca', 'Magnus Carlsen', 'Fabiano Caruana', 'Bobby Fischer', 'Garry Kasparov',
    'Paul Morphy', 'Hikarua Nakamura', 'Judit Polgár', 'Mikhail Tal']



  return (
    <div className='side-modal-container'>
      <div className='side-modal-header'>
        <h2>Choose Profile</h2>
        <button className='menu-button' onClick={handleSideModal}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>
      <div className='top-players-section'>
        {playerList.map((player, playerIndex) => {
          return (
            <ProfileCard key={playerIndex} onClick={() => {
              // Some profile data load function
            }} >
              <p>{player}</p>
            </ProfileCard>
          )
        }
        )}

      </div>

    </div>
  )
}
