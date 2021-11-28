const level1 = [
  [0, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 3, 0, 0],
]
const level2 = [
  [2, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 0],
]

const level3 = [
  [2, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
]

const level4 = [
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0, 0, 0],
  [2, 1, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 3],
]

const levels = {
  0: level1,
  1: level2,
  2: level3,
  3: level4,
}


const field = document.querySelector('.field')
const start = document.querySelector('#start')
const next = document.querySelector('#next')
const container = document.querySelector('.container')
const livesSpan = document.querySelector('#lives')
const pointsSpan = document.querySelector('#points')
const bestSpan = document.querySelector('#best')
const levelDiv = document.querySelector('.current-level')
const difficulty = document.querySelector('#difficulty')


let points = 0
let bestPoints = 0
let levelPoints = 0
let currentLevel = 0
let lives = 3
let gameIsPaused = true


const addToScores = () => {
  if (points > bestPoints) {
    bestPoints = points
    bestSpan.textContent = `Лучший результат: ${bestPoints}`
  }
}

const clearField = () => {
  field.innerHTML = ''
}

const gameOver = () => {
  if (gameIsPaused) return;

  points -= levelPoints + 2
  levelPoints = 0
  lives--

  if (lives <= 0) {
    addToScores()
    difficulty.disabled = false
    currentLevel = 0
    lives = 3
    points = 0
    alert('Игра окончена!')
  }

  livesSpan.textContent = `Жизни: ${lives}`
  pointsSpan.textContent = `Баллы: ${points}`
  clearField()
  fill()
  gameIsPaused = true
}

const startGame = () => {
  if (difficulty.value === '5') {
    Array.from(document.querySelectorAll('.square'))
      .forEach(it => it.classList.add('very-hard'))
  }

  gameIsPaused = false
  if (!currentLevel) {
    livesSpan.textContent = `Жизни: ${lives}`
    difficulty.disabled = true
  }
  Array.from(field.children).forEach(it => {
    it.classList.remove('green')
    it.classList.remove('red')
  })
  document.querySelector('.start').addEventListener('mouseover', () => {
    document.querySelector('.finish').addEventListener('mouseover', levelWin)
  })
}

const levelWin = (e) => {
  e.stopPropagation()
  clearField()
  field.innerHTML = `<div>Уровень ${currentLevel + 1} пройден!</div>`
  next.hidden = false
  start.hidden = true
  container.removeEventListener('mouseover', gameOver)
  currentLevel++
  levelPoints = 0
  gameIsPaused = true
}

const setRed = (div) => {
  div.classList.add('red')
  div.addEventListener('mouseover', gameOver)
}

const setGreen = (div) => {
  div.classList.add('green')
  div.addEventListener('mouseover', (e) => {
    e.stopPropagation()
    div.classList.add('green')
  })
  div.addEventListener('mouseover', function addPoints() {
    if (!gameIsPaused) {
      points += +difficulty.value
      levelPoints += +difficulty.value
      pointsSpan.textContent = `Баллы: ${points}`
      div.removeEventListener('mouseover', addPoints)
    }
  })
}

const setStart = (div) => {
  div.classList.add('blue', 'start')
  div.textContent = 'S'
  div.addEventListener('mouseover', (e) => {
    e.stopPropagation()
    container.addEventListener('mouseover', gameOver, {once: true})
  })
}

const setFinish = (div) => {
  div.classList.add('blue', 'finish')
  div.textContent = 'F'
}

const fill = () => {
  levelDiv.textContent = `Текущий уровень: ${currentLevel + 1}`
  field.innerHTML = ''

  if (!levels[currentLevel]) {
    alert('Игра пройдена!')
    addToScores()
    difficulty.disabled = false
    currentLevel = 0
    lives = 3
    points = 0
    pointsSpan.textContent = `Баллы: ${points}`
    livesSpan.textContent = `Жизни: ${lives}`
    fill()
    return;
  }

  const size = `${100 / levels[currentLevel][0].length}%`

  levels[currentLevel].forEach(row => {
    row.forEach(item => {
      const div = document.createElement('div')
      div.style.width = size
      div.style.height = size
      div.classList.add('square')
      if (difficulty.value !== '2' && difficulty.value !== '4' && difficulty.value !== '5') {
        div.classList.add('square-border')
      }
      if (item === 0) {
        setRed(div)
      } else if (item === 1) {
        setGreen(div)
      } else if (item === 2) {
        setStart(div)
      } else if (item === 3) {
        setFinish(div)
      }
      field.append(div)
    })
  })

  Array.from(document.querySelectorAll('.red')).forEach(it => {
    it.addEventListener('mouseover', () => {
      document.querySelector('.finish').removeEventListener('mouseover', levelWin)
    })
  })
}

fill()

start.addEventListener('click', startGame)

next.addEventListener('click', () => {
  fill()
  start.hidden = false
  next.hidden = true
})

difficulty.addEventListener('change', () => {
  const squares = Array.from(document.querySelectorAll('.square'))
  if (difficulty.value === '1') {
    field.classList.remove('hard')
    squares.forEach(it => it.classList.add('square-border'))
  } else if (difficulty.value === '2') {
    field.classList.remove('hard')
    squares.forEach(it => it.classList.remove('square-border'))
  } else if (difficulty.value === '3') {
    squares.forEach(it => it.classList.add('square-border'))
    field.classList.add('hard')
  } else if (difficulty.value === '4') {
    squares.forEach(it => it.classList.remove('square-border'))
    field.classList.add('hard')
  } else if (difficulty.value === '5') {
    squares.forEach(it => it.classList.remove('square-border'))
    field.classList.add('hard')
  }
})