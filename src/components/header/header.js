export default function header() {
  const header = document.createElement('header')
  header.innerHTML = ''

  const hamburgerButton = document.createElement('button')
  hamburgerButton.className = 'hamburger'
  hamburgerButton.type = 'button'
  hamburgerButton.textContent = '☰'

  const nav = document.createElement('nav')
  nav.id = 'nav'
  const ul = document.createElement('ul')
  ul.id = 'links'

  const links = [
    { path: '/Home', label: 'Home' },
    { path: '/Tic-Tac-Toe', label: 'Tic-Tac-Toe' },
    { path: '/Hangman', label: 'Hangman' },
    { path: '/Sudoku', label: 'Sudoku' }
  ]

  links.forEach((linkData) => {
    const li = document.createElement('li')
    li.className = 'link'
    const a = document.createElement('a')
    a.href = linkData.path
    a.textContent = linkData.label

    a.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState(null, '', linkData.path)

      window.router && window.router(window.main)
      updateActiveLink()

      nav.classList.remove('open')
    })

    li.appendChild(a)
    ul.appendChild(li)
  })

  nav.appendChild(ul)
  header.appendChild(hamburgerButton)
  header.appendChild(nav)

  hamburgerButton.addEventListener('click', () => {
    nav.classList.toggle('open')
  })

  function updateActiveLink() {
    const currentPath = window.location.pathname
    const items = ul.querySelectorAll('li')
    items.forEach((li) => {
      const a = li.querySelector('a')
      if (a.getAttribute('href') === currentPath) {
        li.classList.add('active')
      } else {
        li.classList.remove('active')
      }
    })
  }

  updateActiveLink()

  return { element: header, updateActiveLink }
}
