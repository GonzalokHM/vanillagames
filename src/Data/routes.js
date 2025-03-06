import hangman from '../pages/hangman/hangman'
import home from '../pages/home/home'
import sudokuGame from '../pages/sudoku/sudoku'
import ticTacToe from '../pages/ticTacToe/ticTacToe'

const routes = [
  {
    path: '/Home',
    component: (container) => {
      return home(container)
    }
  },
  {
    path: '/Tic-Tac-Toe',
    component: (container) => {
      return ticTacToe(container)
    }
  },
  {
    path: '/Hangman',
    component: (container) => {
      return hangman(container)
    }
  },
  {
    path: '/Sudoku',
    component: (container) => {
      return sudokuGame(container)
    }
  }
]

export default routes
