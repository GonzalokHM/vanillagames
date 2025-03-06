import ticTacToeBackground from '/assets/ticTacToeBackground.webp'
import tictactoeMusic from '/assets/tictactoeMusic.mp3'
import XIcon from '/assets/ticTacToeX.webp'
import OIcon from '/assets/ticTacToeO.webp'
import './TicTacToe.css'

export default function ticTacToe(container) {
  const TTTContainer = document.createElement('div')
  TTTContainer.id = 'TTTContainer'

  const gameButton = document.createElement('button')
  gameButton.type = 'button'
  gameButton.className = 'game-button start'
  gameButton.textContent = 'Start Game'

  const turnDiv = document.createElement('div')
  turnDiv.className = 'turn'

  const boardDiv = document.createElement('div')
  boardDiv.className = 'board'

  const muteButton = document.createElement('button')
  muteButton.type = 'button'
  muteButton.className = 'togle-music'
  muteButton.textContent = 'Mute'

  TTTContainer.append(gameButton, turnDiv, boardDiv, muteButton)
  container.appendChild(TTTContainer)

  let isStarted = false
  let player = 'X'
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  let winner = null
  let isMuted = false

  const audio = new Audio(tictactoeMusic)
  audio.loop = true
  audio.play().catch(() => {})

  document.body.style.backgroundImage = `url(${ticTacToeBackground})`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundPosition = 'center'

  function startGame() {
    isStarted = true
    player = 'X'
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    winner = null
    updateGame()
  }

  function endGame() {
    isStarted = false
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
    player = 'X'
    winner = null
    updateGame()
  }

  function handleCellClick(row, col) {
    if (!isStarted || board[row][col] || winner) return

    board[row][col] = player
    checkWinner()
    if (!winner) {
      player = player === 'X' ? 'O' : 'X'
    }
    updateGame()
  }

  function updateGame() {
    if (isStarted) {
      gameButton.textContent = 'End Game'
      gameButton.className = 'game-button end'
    } else {
      gameButton.textContent = 'Start Game'
      gameButton.className = 'game-button start'
    }

    if (isStarted && !winner) {
      turnDiv.innerHTML = `<h3>Player's Turn: ${player}</h3>`
    } else {
      turnDiv.innerHTML = ''
    }

    boardDiv.innerHTML = ''
    board.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div')
      rowDiv.className = 'tic-tac-toe-row'
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement('button')
        cellButton.type = 'button'
        cellButton.className = 'tic-tac-toe-cell'
        cellButton.addEventListener('click', () =>
          handleCellClick(rowIndex, colIndex)
        )
        if (cell === 'X' || cell === 'O') {
          const img = document.createElement('img')
          img.className = 'tic-tac-toe-icon'
          img.src = cell === 'X' ? XIcon : OIcon
          img.alt = cell
          cellButton.appendChild(img)
        }
        rowDiv.appendChild(cellButton)
      })
      boardDiv.appendChild(rowDiv)
    })

    if (winner) {
      let winnerDiv = document.querySelector('.winner')
      if (!winnerDiv) {
        winnerDiv = document.createElement('div')
        winnerDiv.className = 'winner'
        boardDiv.parentNode.insertBefore(winnerDiv, boardDiv.nextSibling)
      }
      winnerDiv.innerHTML = `<p>Winner: ${winner}</p>`
    } else {
      const winnerDiv = document.querySelector('.winner')
      if (winnerDiv) {
        winnerDiv.remove()
      }
    }
  }

  function checkWinner() {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        winner = board[i][0]
        return
      }
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        winner = board[0][i]
        return
      }
    }
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      winner = board[0][0]
      return
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      winner = board[0][2]
      return
    }
    if (board.every((row) => row.every((cell) => cell))) {
      winner = 'Empate'
    }
  }

  gameButton.addEventListener('click', () => {
    if (isStarted) {
      endGame()
    } else {
      startGame()
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

  updateGame()

  return function cleanup() {
    audio.pause()
    document.body.style.backgroundImage = ''
    console.log('Cleanup TicTacToe: audio paused')
  }
}
