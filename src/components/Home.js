import React from 'react'
import dice from '../assets/images/dice.png'

export default function Home({ toggle }) {
  return (
    <div className="homepage">
      <h1 className="homepage-title">Hold Dice Game</h1>
      <section className="homepage-container">
        <div className="hompage-img">
          <img src={dice} alt="dice" className="home-img" />
        </div>
        <button className="play-game" onClick={toggle}>
          Play Game
        </button>
      </section>
    </div>
  )
}
