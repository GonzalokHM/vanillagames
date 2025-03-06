// hangman.js
import hangmanMusicURL from '/assets/hangmanMusic.mp3'
import hangmanBackground from '/assets/hangmanBackground.webp'
import './Hangman.css'

const words = [
  'apple',
  'banana',
  'cherry',
  'date',
  'berry',
  'car',
  'mouse',
  'honey',
  'kiwi',
  'house',
  'mango',
  'bike',
  'orange',
  'neuron',
  'quantum'
]
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function hangman(container) {
  document.body.style.backgroundImage = `url(${hangmanBackground})`
  document.body.style.backgroundSize = 'cover'
  document.body.style.backgroundPosition = 'center'

  const audio = new Audio(hangmanMusicURL)
  audio.loop = true
  audio.play().catch((e) => console.error('Error al reproducir la música:', e))

  let isMuted = false
  let currentWord = ''
  let guessedLetters = []
  let wrongLetters = []
  let remainingAttempts = 6
  let gameStarted = false
  let gameOver = false
  let gameWon = false

  const hangmanContainer = document.createElement('div')
  hangmanContainer.className = 'hangman-container'

  const startButton = document.createElement('button')
  startButton.className = 'hangman-start'
  startButton.type = 'button'
  startButton.textContent = 'Start Game'

  const wordContainer = document.createElement('div')
  wordContainer.id = 'word'
  const drawingContainer = document.createElement('div')
  drawingContainer.id = 'hangman-drawing'
  const wordDisplay = document.createElement('p')

  wordContainer.append(drawingContainer, wordDisplay)

  // elementos para cada parte
  const head = document.createElement('div')
  head.className = 'hangman-part head'
  const body = document.createElement('div')
  body.className = 'hangman-part body'
  const leftArm = document.createElement('div')
  leftArm.className = 'hangman-part left-arm'
  const rightArm = document.createElement('div')
  rightArm.className = 'hangman-part right-arm'
  const leftLeg = document.createElement('div')
  leftLeg.className = 'hangman-part left-leg'
  const rightLeg = document.createElement('div')
  rightLeg.className = 'hangman-part right-leg'

  drawingContainer.appendChild(head)
  drawingContainer.appendChild(body)
  drawingContainer.appendChild(leftArm)
  drawingContainer.appendChild(rightArm)
  drawingContainer.appendChild(leftLeg)
  drawingContainer.appendChild(rightLeg)

  const errorInfoContainer = document.createElement('div')
  errorInfoContainer.className = 'error-info'
  const wrongLettersDisplay = document.createElement('div')
  const livesDisplay = document.createElement('div')
  errorInfoContainer.appendChild(wrongLettersDisplay)
  errorInfoContainer.appendChild(livesDisplay)

  const alphabetContainer = document.createElement('div')
  alphabetContainer.className = 'alphabet'

  const gameMessage = document.createElement('div')
  gameMessage.className = 'game-message'

  const muteButton = document.createElement('button')
  muteButton.className = 'togle-music'
  muteButton.type = 'button'
  muteButton.textContent = 'Mute'

  hangmanContainer.append(
    startButton,
    wordContainer,
    errorInfoContainer,
    alphabetContainer,
    gameMessage,
    muteButton
  )
  container.appendChild(hangmanContainer)

  function renderWord() {
    const display = currentWord
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ')
    wordDisplay.textContent = display
  }

  function updateDrawing() {
    head.style.visibility = wrongLetters.length >= 1 ? 'visible' : 'hidden'
    body.style.visibility = wrongLetters.length >= 2 ? 'visible' : 'hidden'
    leftArm.style.visibility = wrongLetters.length >= 3 ? 'visible' : 'hidden'
    rightArm.style.visibility = wrongLetters.length >= 4 ? 'visible' : 'hidden'
    leftLeg.style.visibility = wrongLetters.length >= 5 ? 'visible' : 'hidden'
    rightLeg.style.visibility = wrongLetters.length >= 6 ? 'visible' : 'hidden'
  }

  function renderWrongLetters() {
    wrongLettersDisplay.textContent =
      'Wrong Letters: ' + wrongLetters.join(', ')
  }
  function renderLives() {
    livesDisplay.textContent = 'Lives: ' + remainingAttempts
  }

  function renderAlphabet() {
    alphabetContainer.innerHTML = ''
    alphabet.forEach((letter) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.textContent = letter.toUpperCase()
      if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        btn.disabled = true
      }
      btn.addEventListener('click', () => makeGuess(letter))
      alphabetContainer.appendChild(btn)
    })
  }

  function updateGameState() {
    renderWord()
    updateDrawing()
    renderWrongLetters()
    renderLives()
    renderAlphabet()

    if (gameStarted) {
      if (wrongLetters.length >= 6) {
        gameOver = true
        gameWon = false
        gameMessage.textContent = 'Game Over!'
      } else if (
        currentWord.split('').every((letter) => guessedLetters.includes(letter))
      ) {
        gameOver = true
        gameWon = true
        gameMessage.textContent = 'You Win!'
      } else {
        gameMessage.textContent = ''
      }
    }
  }

  function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)]
    guessedLetters = []
    wrongLetters = []
    remainingAttempts = 6
    gameStarted = true
    gameOver = false
    gameWon = false
    updateGameState()
  }

  function makeGuess(letter) {
    if (gameOver) return
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return

    if (currentWord.includes(letter)) {
      guessedLetters.push(letter)
    } else {
      wrongLetters.push(letter)
      remainingAttempts = 6 - wrongLetters.length
    }
    updateGameState()
  }

  startButton.addEventListener('click', startGame)
  muteButton.addEventListener('click', () => {
    isMuted = !isMuted
    if (isMuted) {
      audio.pause()
      muteButton.textContent = 'Unmute'
    } else {
      audio
        .play()
        .catch((e) => console.error('Error al reproducir la música:', e))
      muteButton.textContent = 'Mute'
    }
  })

  function cleanup() {
    audio.pause()
    console.log('Cleanup home: audio pausado')
  }

  return cleanup
}
