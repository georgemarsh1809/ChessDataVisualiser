import React, { useEffect } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { SideModal } from '../common/SideModal/SideModal';
import { GameCard } from './components/GameCard/GameCard';
import { AnalysisBoard } from './components/AnalysisBoard/AnalysisBoard';
import { useStore } from '../../stateManagement/store';
import styles from './DataTab.module.css'
import commonStyles from '../common/CommonStyles.module.css';

export const DataTab = () => {

  const { toggleSideModal, playerProfile, allGamesData, totalGameData, pageNumber, gameId, currentGameHeader, currentGameMoves } = useStore()
  const setPageNumber = useStore((state) => state.setPageNumber);
  const pageNumberLimit = Math.ceil(totalGameData / 10)

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
              {playerProfile}'s Data |
            </h2>
            <p>&nbsp; {totalGameData} games</p>
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
        <div className={styles.yourGamesTitleTextContainer}>
          Games
        </div>
        <div className={styles.pageButtonsContainer}>
          <button onClick={() => {
            setPageNumber(1)
          }}>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button className={styles.pageNumIncButton} onClick={() => {
            setPageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
          }
          }>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <p>Page: {pageNumber} / {pageNumberLimit}</p>
          <button onClick={() => {
            setPageNumber(pageNumber + 1)
          }
          }>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

      </div>
      <div className={styles.gameDataContainer}>
        <div className={styles.gameListContainer}>
          {allGamesData.map((gameData, gameIndex) => {
            return (
              <GameCard key={gameIndex} data={gameData} index={gameIndex}>

              </GameCard>
            )
          })}
        </div>

        <div className={styles.boardViewContainer}>
          <div className={styles.gameTitleContainer}>
            <p>&nbsp;{currentGameHeader}</p>
          </div>
          <div className={styles.chessBoardContainer}>
            <AnalysisBoard >

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
