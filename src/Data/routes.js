import setupHome from '../pages/home'

export default routes = [
  { path: '/', component: setupHome },
  { path: '/index.html', component: setupHome },
  {
    path: '/Tic-Tac-Toe',
    component: (container) => {
      container.innerHTML = '<h2>Tic Tac Toe view</h2>'
      // TicTacToe
    }
  },
  {
    path: '/Hangman',
    component: (container) => {
      container.innerHTML = '<h2>Hangman view</h2>'
      // Hangman
    }
  },
  {
    path: '/Sudoku',
    component: (container) => {
      container.innerHTML = '<h2>Sudoku view</h2>'
      // Sudoku
    }
  },
  {
    default: true,
    component: (container) =>
      (container.innerHTML = '<h2>Página no encontrada</h2>')
  }
]
