import React, { useState } from 'react'
import { SideModal } from '../common/SideModal/SideModal'
import { useStore } from '../../stateManagement/store'
import commonStyles from '../common/CommonStyles.module.css'
import styles from './DashboardTab.module.css'


export const DashboardTab = () => {
  const { toggleSideModal } = useStore()

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
              George's Dashboard |
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

      {/* <div className='graph-container'>
        {/* Maybe create a graph scroller component? </div>  */}

    </div>
  )
}
