export default function setupHome(container) {
  const title = document.createElement('h1')
  title.textContent = 'welcome Retro Games Hub'
  container.appendChild(title)

  const card = document.createElement('div')
  card.className = 'card'
  card.textContent = '¡Haz click en mí!'
  container.appendChild(card)

  const toggleButton = document.createElement('button')
  toggleButton.className = 'toggle-music'
  toggleButton.type = 'button'
  toggleButton.textContent = '🔊'
  container.appendChild(toggleButton)

  let isMusicPlaying = false
  let hasInteracted = false
  const audio = new Audio(homeMusicURL)
  audio.loop = true

  function toggleMute() {
    isMusicPlaying = !isMusicPlaying
    if (isMusicPlaying) {
      audio
        .play()
        .catch((e) => console.error('Error al reproducir la música:', e))
      toggleButton.textContent = '🔇'
    } else {
      audio.pause()
      toggleButton.textContent = '🔊'
    }
  }

  function handleCardClick() {
    if (!hasInteracted) {
      audio
        .play()
        .catch((e) => console.error('Error al reproducir la música:', e))
      isMusicPlaying = true
      toggleButton.textContent = '🔇'
      hasInteracted = true
    }
  }

  toggleButton.addEventListener('click', toggleMute)
  card.addEventListener('click', handleCardClick)
}
