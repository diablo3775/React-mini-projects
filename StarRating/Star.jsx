import React, { useState } from 'react'

const Star = () => {
  const [rating, setRating] = useState(0)

  function starRating(i) {
    setRating(i + 1)
  }
  return (
    <div>
      {Array(5).fill("★").map((star, i) => (
        <div key={i} onClick={() => starRating(i)}>
          {i < rating ?
            <div style={{ color: 'red' }}>{star}</div>
            : star}
        </div>
      ))}
    </div>
  )
}

export default Star
