import React from 'react'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Home from './components/Home'
import Stopwatch from './components/Stopwatch'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  const [time, setTime] = React.useState(0)
  const [start, setStart] = React.useState(false)

  const [waiting, setWaiting] = React.useState(true)

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setStart(false)
    }
  }, [dice])

  const startGame = () => {
    setStart(true)
  }

  if (waiting) {
    return <Home toggle={playGame} />
  }
  function playGame() {
    setWaiting(false)
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setTime(0)
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="game-title"> 🎲 Hold Dice 🎲 </h1>

      {tenzies ? (
        <h2> 🏆 YOU WON! 🏆 </h2>
      ) : (
        <p className="instructions">
          Select dice and roll until all selected dices are the same
        </p>
      )}

      <div className="dice-container">{diceElements}</div>
      <Stopwatch
        start={start}
        setTime={setTime}
        time={time}
        setStart={setStart}
      />

      {!start && !tenzies ? (
        <button className="new-game" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <button className="roll-dice" onClick={rollDice}>
          {!tenzies ? 'Roll' : 'New Game'}
        </button>
      )}
    </main>
  )
}
