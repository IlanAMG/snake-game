import React from 'react'

export const Snake = ({ snake }) => {
    return (
        <>
        {
            snake.map((box, key) => {
                const color = key === snake.length - 1 ? '#341f97' : 'blueviolet'
                const style = {
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    backgroundColor: color
                }
                return (
                    <div key={key} className='snake' style={style}>
                    
                    </div>
                )
            })
        }
        </>
    )
}




