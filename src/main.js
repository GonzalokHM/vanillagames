import './style.css'
import router from './router/index.js'
import footer from './components/footer/footer.js'
import header from './components/header/header.js'

if (window.location.pathname === '/') {
  window.location.pathname = '/Home'
}

const app = document.getElementById('app')

const headerComponent = header()
const main = document.createElement('main')
const footerComponent = footer()
app.append(headerComponent.element, main, footerComponent)

window.router = router
window.main = main

router(main)
