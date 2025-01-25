import React from 'react'

export default function Layout(props) {
    const { children } = props


    const header = (
        <header>
            <div className='header-container'>
                <nav className='nav-container'>
                    <i className="fa-regular fa-chess-queen"></i>
                    <button className='dashboard-tab-button'>
                        <p>
                            Dashboard
                        </p>
                    </button>
                    <button className='data-tab-button' onClick={() => { return }}>
                        <p>
                            Data
                        </p>
                    </button>
                </nav>
                <div className='right-header'>
                    <button className='import-button'>

                        Import

                    </button>
                    <button className='settings-button'>
                        <i className="fa-solid fa-gear settings-button-icon"></i>
                    </button>
                    <button className='profile-button'>
                        GM
                    </button>
                </div>
            </div>
        </header >
    )



    return (
        <>
            {header}
            <main>
                {children}
            </main>
        </>
    )
}
