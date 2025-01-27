import React from 'react'

export default function GameCard(props) {

    const { children } = props
    return (
        <div className='game-card'>
            {children}
        </div>
    )
}
