import routes from '../data/routes'

let currentCleanup = null

export default function router(container) {
  const path = window.location.pathname
  const target = container || document.querySelector('main')
  if (!target) return

  if (currentCleanup && typeof currentCleanup === 'function') {
    currentCleanup()
    currentCleanup = null
  }
  target.innerHTML = ''

  const route =
    routes.find((r) => r.path === path) || routes.find((r) => r.default)

  if (route && typeof route.component === 'function') {
    const cleanupFn = route.component(target)
    if (typeof cleanupFn === 'function') {
      currentCleanup = cleanupFn
    }
  } else {
    container.innerHTML = '<h2>Página no encontrada</h2>'
  }
}

window.addEventListener('popstate', () => {
  window.router && window.router(window.mainContainer)
})
