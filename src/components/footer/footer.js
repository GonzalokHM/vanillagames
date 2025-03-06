import './footer.css'

export default function footer() {
  const footer = document.createElement('footer')
  footer.className = 'footer'
  footer.innerHTML =
    'developed by <a href="https://ghmportfolio.netlify.app/home" target="_blank" rel="noopener noreferrer">ghmdevs</a>'
  return footer
}
