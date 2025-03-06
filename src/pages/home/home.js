import homeMusic from '/assets/HomeMusic.mp3'
import hangmanImg from '/assets/cartucho-hangman.webp'
import tictactoeImg from '/assets/cartucho-Tictactoe.webp'
import sudokuImg from '/assets/cartucho-sudoku.webp'
import './home.css'

export default function home(container) {
  const homeContainer = document.createElement('div')
  homeContainer.className = 'home-container'

  const title = document.createElement('h1')
  title.textContent = 'welcome Retro Games Hub'
  homeContainer.appendChild(title)

  const carousel = document.createElement('div')
  carousel.className = 'carousel'
  homeContainer.appendChild(carousel)

  const images = [
    {
      src: hangmanImg,
      alt: 'Hangman',
      details: 'Letter by letter, guess or swing  💀'
    },
    {
      src: tictactoeImg,
      alt: 'Tic Tac Toe',
      details: "Crosses and noughts, a quick thought's bout"
    },
    {
      src: sudokuImg,
      alt: 'Sudoku',
      details: 'Numbers align, a puzzle divine'
    }
  ]

  let hasInteracted = false

  function handleCardClick() {
    if (!hasInteracted) {
      audio
        .play()
        .catch((e) => console.error('Error al reproducir la música:', e))
      isMusicPlaying = true
      updateToggleButton()
      hasInteracted = true
    }
  }

  images.forEach((image) => {
    const card = document.createElement('div')
    card.className = 'card'

    const innerCard = document.createElement('div')
    innerCard.className = 'inner-card'
    card.appendChild(innerCard)

    const front = document.createElement('div')
    front.className = 'front'
    const imgElem = document.createElement('img')
    imgElem.src = image.src
    imgElem.alt = image.alt
    imgElem.className = 'game-image'
    front.appendChild(imgElem)
    innerCard.appendChild(front)

    const back = document.createElement('div')
    back.className = 'back'
    const p = document.createElement('p')
    p.textContent = image.details
    back.appendChild(p)
    innerCard.appendChild(back)

    card.addEventListener('click', () => {
      card.classList.toggle('flipped')
      handleCardClick()
    })

    carousel.appendChild(card)
  })

  const audio = new Audio(homeMusic)
  audio.loop = true
  let isMusicPlaying = false

  const toggleMusicButton = document.createElement('button')
  toggleMusicButton.className = 'togle-music'
  toggleMusicButton.type = 'button'
  toggleMusicButton.textContent = '🔊'
  homeContainer.appendChild(toggleMusicButton)

  function updateToggleButton() {
    toggleMusicButton.textContent = isMusicPlaying ? '🔇' : '🔊'
  }

  toggleMusicButton.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying
    if (isMusicPlaying) {
      audio
        .play()
        .catch((e) => console.error('Error al reproducir la música:', e))
    } else {
      audio.pause()
    }
    updateToggleButton()
  })

  function cleanup() {
    audio.pause()
    console.log('Cleanup home: audio pausado')
  }

  container.appendChild(homeContainer)
  return cleanup
}
