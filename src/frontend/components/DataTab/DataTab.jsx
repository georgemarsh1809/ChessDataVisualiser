import React, { useState } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { SideModal } from '../common/SideModal/SideModal';
import { GameCard } from './components/GameCard/GameCard';
import { AnalysisBoard } from './components/AnalysisBoard/AnalysisBoard';
import { useStore } from '../../stateManagement/store';
import styles from './DataTab.module.css'
import commonStyles from '../common/CommonStyles.module.css';

export const DataTab = () => {

  const { toggleSideModal } = useStore()

  const fakeData = [
    '001 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '002 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '003 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '004 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '005 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win',
    '006 | Opponent: Magnus Carlsen | Location: Moscow | Event: 41st Festival GM | Year: 2022 | Outcome: Win'
  ]

  return (
    <div className={commonStyles.tabContainer}>

      <SideModal />

      <div className={commonStyles.tabHeader}>
        <div className={commonStyles.tabHeaderTitle}>
          <button className={commonStyles.menuButton} onClick={toggleSideModal}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className={commonStyles.tabHeaderTitleText}>
            <h2>
              George's Data |
            </h2>
            <p>
              &nbsp;973 games
            </p>
          </div>
        </div>
        <div className={commonStyles.tabHeaderButtons}>
          <button className={commonStyles.filterButton}>
            <i className="fa-solid fa-filter"></i>
            <p>Add Filter</p>
          </button>
          <button className={commonStyles.dateRangeButton}>
            <i className="fa-solid fa-calendar-days"></i>
            <p>Date Range</p>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <button className={commonStyles.downloadButton}>
            <i className="fa-solid fa-download"></i>
          </button>
          <button className={commonStyles.shareButton}>
            <i className="fa-solid fa-share-from-square"></i>
          </button>
        </div>
      </div>
      <div className={styles.yourGamesTitleBar}>
        Your Games
      </div>
      <div className={styles.gameDataContainer}>
        <div className={styles.gameListContainer}>
          {fakeData.map((fakeGame, fakeGameIndex) => {
            return (
              <GameCard key={fakeGameIndex}>
                {fakeGame}
                <button className={styles.openGameButton}>
                  <i className="fa-solid fa-up-right-from-square"></i>
                </button>
              </GameCard>
            )
          })}
        </div>
        <div className={styles.boardViewContainer}>
          <div className={styles.gameTitleContainer}>
            <p className={commonStyles.boldText}>Game 006&nbsp;|</p>
            <p>&nbsp;Hikaru Nakamura, London, 2021</p>
          </div>
          <div className={styles.chessBoardContainer}>
            <AnalysisBoard>

            </AnalysisBoard>
          </div>
          <div className={styles.moveCounterContainer}>
            <button className={styles.prevMoveButton}>
              <i className="fa-solid fa-chevron-left" />
            </button>
            <p className={styles.moveCounter}>Move: 0</p>
            <button className={styles.nextMoveButton}>
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
