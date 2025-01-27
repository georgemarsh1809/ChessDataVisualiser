import React, { useState } from 'react'
import { Chessboard } from "react-chessboard"; // How cool!
import { Chess } from 'chess.js';
import SideModal from './SideModal'
import GameCard from './GameCard';

export default function DataTab() {

  const [showSideModal, setShowSideModal] = useState(false)

  const fakeData = [
    '001 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '002 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '003 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '004 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '005 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '006 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win'
  ]

  function handleSideModal() {
    setShowSideModal(!showSideModal)
  }


  return (
    <div className='data-tab-container'>
      {showSideModal && (
        <SideModal handleSideModal={handleSideModal} showSideModal={showSideModal} />
      )}
      <div className='data-header'>
        <div className='data-header-title'>
          <button className='menu-button' onClick={handleSideModal}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className='data-header-title-text'>
            <h2>
              George's Data |
            </h2>
            <p>
              &nbsp;973 games
            </p>
          </div>
        </div>
        <div className='data-header-buttons'>
          <button className='filter-button'>
            <i className="fa-solid fa-filter"></i>
            <p className='filter-button-text'>Add Filter</p>
          </button>
          <button className='date-range-button'>
            <i className="fa-solid fa-calendar-days"></i>
            <p className='date-range-button-text'>Date Range</p>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <button className='download-button'>
            <i className="fa-solid fa-download"></i>
          </button>
          <button className='share-button'>
            <i className="fa-solid fa-share-from-square"></i>
          </button>
        </div>
      </div>
      <div className='your-games-header-bar'>
        Your Games
      </div>
      <div className='game-data-container'>
        <div className='game-list-container'>
          {fakeData.map((fakeGame, fakeGameIndex) => {
            return (
              <GameCard key={fakeGameIndex}>
                {fakeGame}
                <button className='open-game-button'>
                  <i className="fa-solid fa-up-right-from-square"></i>
                </button>
              </GameCard>
            )
          })}
        </div>
        <div className='board-view-container'>
          <div className='game-title-container'>
            <p className='bold-text'>Game 006&nbsp;|</p>
            <p>&nbsp;Hikaru Nakamura, London, 2021</p>
          </div>
          <div className='chess-board-container'>
            <Chessboard>

            </Chessboard>
          </div>
          <div className='move-counter-container'>
            <button className='prev-move-button'>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <p className='move-counter'>Move: 0</p>
            <button className='next-move-button'>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
