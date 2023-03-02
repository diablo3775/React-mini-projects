//Create 9 boxes of color gray when clicking on a box it should change to red remaning shold stay gray
// when clicked on another box it should become red and remaining should stay gray
import React, { useState } from 'react'
import './Box.css'

const Box = () => {
  const [color, setColor] = useState()

  const handleClick = (i) => {
    setColor(i)
  }

  return (
    <div className='box-container'>
      {Array(9).fill("").map((_,i) => (
        <div className='box'  key={i} style={{backgroundColor: i === color ? "red" : "gray"}} onClick={() => handleClick(i)}>
        </div>
      ))}
    </div>
  )
}

export default Box
