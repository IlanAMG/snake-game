import React from 'react'

export const Food = ({ food }) => {

    const style = {
        left: `${food.x}%`,
        top: `${food.y}%`
    }
    return (
        <div className='wrapper-food' style={style}>
            <div className='food'>
                
            </div>
        </div>
    )
}
