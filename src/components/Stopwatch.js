import React from 'react'

const Stopwatch = ({ start, setTime, time, dice, setStart }) => {
  React.useEffect(() => {
    let interval = null

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [start])
  return (
    <div>
      <h2 className="set-timer">
        <span>⏱{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1) % 60)).slice(-2)}⏱</span>
      </h2>
    </div>
  )
}

export default Stopwatch
