export default function createRouter(routes) {
  function router() {
    const path = window.location.pathname
    const container = document.getElementById('app')
    container.innerHTML = ''

    const route =
      routes.find((r) => r.path === path) || routes.find((r) => r.default)

    if (route && typeof route.component === 'function') {
      route.component(container)
    } else {
      container.innerHTML = '<h2>Página no encontrada</h2>'
    }
  }

  window.addEventListener('popstate', router)

  return { router }
}
