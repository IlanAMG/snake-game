import React, { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

import { Snake } from './components/Snake';
import { Food } from './components/Food';

const App = () => {
  const initialSnake = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 10, y: 0 }
  ]
  const [speed, setSpeed] = useState(170)
  const [score, setScore] = useState(0)
  const [direction, setDirection] = useState('')
  const [food, setFood] = useState({})
  const [snake, setSnake] = useState(initialSnake)

  const getRandomFood = () => {
    let x = Math.floor((Math.random() * (95 - 5) + 1) / 5) * 5
    let y = Math.floor((Math.random() * (95 - 5) + 1) / 5) * 5
    setFood({ x: x, y: y })
  }

  const getDirection = useCallback(e => {
    const { keyCode } = e;

    if (keyCode === 37 && direction !== 'RIGHT') {
      setDirection('LEFT')
    } else if (keyCode === 38 && direction !== 'DOWN') {
      setDirection('UP')
    } else if (keyCode === 39 && direction !== 'LEFT') {
      setDirection('RIGHT')
    } else if (keyCode === 40 && direction !== 'UP') {
      setDirection('DOWN')
    }
  }, [direction]);

  const moveSnake = () => {
    let copySnake = [...snake]
    let head = copySnake[copySnake.length - 1]

      if (direction === 'LEFT') {
        let newHead = {x: head.x - 5, y: head.y}
        if (newHead.x === food.x && newHead.y === food.y) {
          copySnake.push(newHead)
          getRandomFood()
          setScore(score => score += 1)
          checkScore()
        } else {
          copySnake.push(newHead)
          copySnake.shift()
        }
      }
      if (direction === 'UP') {
        let newHead = {x: head.x, y: head.y - 5}
        if (newHead.x === food.x && newHead.y === food.y) {
          copySnake.push(newHead)
          getRandomFood()
          setScore(score => score += 1)
          checkScore()
        } else {
          copySnake.push(newHead)
          copySnake.shift()
        }
      }
      if (direction === 'RIGHT') {
        let newHead = {x: head.x + 5, y: head.y}
        if (newHead.x === food.x && newHead.y === food.y) {
          copySnake.push(newHead)
          getRandomFood()
          setScore(score => score += 1)
          checkScore()
        } else {
          copySnake.push(newHead)
          copySnake.shift()
        }
      }
      if (direction === 'DOWN') {
        let newHead = {x: head.x, y: head.y + 5}
        if (newHead.x === food.x && newHead.y === food.y) {
          copySnake.push(newHead)
          getRandomFood()
          setScore(score => score += 1)
          checkScore()
        } else {
          copySnake.push(newHead)
          copySnake.shift()
        }
      }
    
    setSnake(copySnake)
  }

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
      checkIfCollapsed()
      checkIfOut()
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  useInterval(moveSnake, speed)

  const checkIfOut = () => {
    let head = snake[snake.length - 1]
    if (head.x >= 100 || head.y >= 100 || head.x <= -5 || head.y <= -5) {
      setDirection('')
      getRandomFood()
      setSnake(initialSnake)
      setScore(0)
      setSpeed(170)
    }
  }

  const checkIfCollapsed = () => {
    let copySnake = [...snake]
    let head = copySnake[copySnake.length - 1]
    copySnake.pop()
    copySnake.forEach(box => {
      if (box.x === head.x && box.y === head.y) {
        setDirection('')
        getRandomFood()
        setSnake(initialSnake)
        setScore(0)
        setSpeed(170)
      }
    })
  }

  const checkScore = () => {
    if (score >= 50) {
      return setSpeed(75)
    }
    if (score >= 40) {
      return setSpeed(85)
    }
    if (score >= 35) {
      return setSpeed(90)
    }
    if (score >= 30) {
      return setSpeed(95)
    }
    if (score >= 25) {
      return setSpeed(100)
    }
    if (score >= 20) {
      return setSpeed(105)
    }
    if (score >= 15) {
      return setSpeed(110)
    }
    if (score >= 10) {
      return setSpeed(120)
    }
    if (score >= 6) {
      return setSpeed(130)
    }
    if (score >= 3) {
      return setSpeed(150)
    }
  }
  
  useEffect(() => {
    window.addEventListener('keydown', getDirection);
    return () => {
      window.removeEventListener('keydown', getDirection);
    };
  }, [getDirection]);

  useEffect(() => {
    getRandomFood()
  }, [])

  return (
    <div className='App'>
      <span className='score'>Score : {score}</span>
      <div className='game-area'>
        <Snake snake={snake} />
        <Food food={food}/>
      </div>
    </div>
  )
}

export default App
