import React from 'react'

export const PlayerProfileCard = (props) => {

    const { children } = props

    return (
        <button className='player-profile-card'>
            {children}
        </button>
    )
}
