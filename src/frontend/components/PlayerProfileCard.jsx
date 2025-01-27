import React from 'react'

export default function PlayerProfileCard(props) {

    const { children } = props

    return (
        <button className='player-profile-card'>
            {children}
        </button>
    )
}
