import React from 'react'

export default function DashboardTab() {
  return (
    <div className='dashboard-tab-container'>
      <div className='dashboard-header'>
        <div className='dashboard-header-title'>
          <button className='menu-button'>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className='dashboard-header-title-text'>
            <h2>
              George's Dashboard |
            </h2>
            <p>
              &nbsp;973 games
            </p>
          </div>
        </div>
        <div className='dashboard-header-buttons'>
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

      <div className='graph-container'>

      </div>
    </div>
  )
}
