const field = document.querySelector('.field')
const start = document.querySelector('#start')
const next = document.querySelector('#next')
const container = document.querySelector('.container')
const livesSpan = document.querySelector('#lives')
const levelDiv = document.querySelector('.current-level')


let currentLevel = 0
let lives = 3
let gameIsPaused = true

const level1 = [
  [0,0,0,0,0,0,2],
  [0,0,0,0,1,1,1],
  [0,0,0,0,1,0,0],
  [0,0,0,0,1,0,0],
  [0,0,0,0,1,0,0],
  [0,0,0,0,1,0,0],
  [0,0,0,0,3,0,0],
]
const level2 = [
  [2,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0],
  [0,0,0,0,3,0,0,0,0],
]

const levels = {
  0: level1,
  1: level2,
}


const clearField = () => {
  field.innerHTML = ''
}

const gameOver = () => {
  if (gameIsPaused) {
    return ;
  }
  lives--
  livesSpan.textContent = `Жизни: ${lives}`
  clearField()
  fill()
  gameIsPaused = true
}

const startGame = () => {
  gameIsPaused = false
  if (!currentLevel) {
    livesSpan.textContent = `Жизни: ${lives}`
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
  // div.addEventListener('mouseover', levelWin)
}

const fill = () => {
  levelDiv.textContent = `Текущий уровень: ${currentLevel + 1}`
  field.innerHTML = ''
  if (!levels[currentLevel]) {
    alert('Игра пройдена!')
    currentLevel = 0
    fill()
    return ;
  }

  const size = `${100 / levels[currentLevel][0].length}%`
  levels[currentLevel].forEach(row => {
    row.forEach(item => {
      const div = document.createElement('div')
      div.style.width = size
      div.style.height = size
      div.style.border = '1px dashed black'
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