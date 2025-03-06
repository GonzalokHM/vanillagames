import sudoku from 'sudoku'
import sudokuBackground from '/assets/SudokuBackground.webp'
import sudokuMusic from '/assets/SudokuMusic.mp3'
import './sudoku.css'

export default function sudokuGame(container) {
  const sudokuContainer = document.createElement('div')
  sudokuContainer.className = 'sudoku-container'

  const boardDiv = document.createElement('div')
  boardDiv.className = 'sudoku-board'

  const buttonsDiv = document.createElement('div')
  buttonsDiv.className = 'buttons'

  const resetButton = document.createElement('button')
  resetButton.className = 'Sbuttons'
  resetButton.type = 'button'
  resetButton.textContent = 'Reset'

  const checkButton = document.createElement('button')
  checkButton.className = 'Sbuttons'
  checkButton.type = 'button'
  checkButton.textContent = 'check it'

  const muteButton = document.createElement('button')
  muteButton.className = 'Sbuttons'
  muteButton.type = 'button'
  muteButton.textContent = 'Mute'

  buttonsDiv.append(resetButton, checkButton, muteButton)
  sudokuContainer.append(boardDiv, buttonsDiv)
  container.appendChild(sudokuContainer)

  let sudokuBoard = []
  let gameOver = false
  let isMuted = false

  const audio = new Audio(sudokuMusic)
  audio.loop = true
  audio.play().catch(() => {})

  document.body.style.backgroundImage = `url(${sudokuBackground})`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundPosition = 'center'

  function resetGame() {
    sudokuBoard = sudoku.makepuzzle()
    gameOver = false
    renderBoard()
    removeCompletionMessage()
  }

  function renderCell(value, index) {
    const cellWrapper = document.createElement('div')
    cellWrapper.className = 'sudoku-cell-wrapper'

    const input = document.createElement('input')
    input.type = 'number'
    input.min = '1'
    input.max = '9'
    input.className = 'sudoku-cell'
    if (value === null) {
      input.value = ''
      input.disabled = false
    } else {
      input.value = value
      input.disabled = true
    }
    input.addEventListener('change', (e) => {
      const val = e.target.value
      sudokuBoard[index] = val === '' ? null : parseInt(val, 10)
    })

    cellWrapper.appendChild(input)
    return cellWrapper
  }

  function renderBoard() {
    boardDiv.innerHTML = ''
    sudokuBoard.forEach((value, index) => {
      const cell = renderCell(value, index)
      boardDiv.appendChild(cell)
    })
  }

  function checkWin() {
    if (sudokuBoard.includes(null)) {
      return false
    }
    const solvedBoard = sudoku.solvepuzzle(sudokuBoard)
    return !!solvedBoard
  }

  function showCompletionMessage() {
    let messageDiv = document.createElement('div')
    messageDiv.className = 'completion-message'
    messageDiv.innerHTML = `<h2>¡Felicidades! Has completado el Sudoku.</h2>`
    container.appendChild(messageDiv)
  }

  function removeCompletionMessage() {
    const msg = container.querySelector('.completion-message')
    if (msg) msg.remove()
  }

  resetButton.addEventListener('click', resetGame)

  checkButton.addEventListener('click', () => {
    if (checkWin()) {
      gameOver = true
      showCompletionMessage()
    } else {
      alert('Aún no has completado el Sudoku correctamente.')
    }
  })

  muteButton.addEventListener('click', () => {
    isMuted = !isMuted
    if (isMuted) {
      audio.pause()
      muteButton.textContent = 'Unmute'
    } else {
      audio.play().catch((err) => console.error(err))
      muteButton.textContent = 'Mute'
    }
  })

  resetGame()

  return function cleanup() {
    audio.pause()
    document.body.style.backgroundImage = ''
    console.log('Cleanup Sudoku: audio paused')
  }
}
