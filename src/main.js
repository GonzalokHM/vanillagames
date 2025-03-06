import './style.css'
import routes from './Data/routes.js'
import createRouter from './router/index.js'
import createFooter from './components/footer/footer.js'
import createNavBar from './components/navbar/navbar.js'

const { router } = createRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div')
  app.id = 'app'
  document.body.appendChild(app)

  const header = document.createElement('header')
  const navComponent = createNavBar()
  header.appendChild(navComponent.element)
  document.body.insertBefore(header, app)

  const footer = createFooter()
  document.body.appendChild(footer)

  router()
})
