import { renderItinerary } from './itinerary.js'
import { renderGuild } from './rpg.js'

const app = document.querySelector('#app')
const toast = document.querySelector('#toast')
let toastTimer

window.showToast = message => {
  window.clearTimeout(toastTimer)
  toast.textContent = message
  toast.classList.remove('translate-y-6', 'opacity-0')
  toastTimer = window.setTimeout(() => toast.classList.add('translate-y-6', 'opacity-0'), 2200)
}

function setNavigation(page) {
  document.querySelectorAll('.nav-btn').forEach(button => {
    const active = button.dataset.nav === page
    button.classList.toggle('bg-white', active)
    button.classList.toggle('text-ink', active)
    button.classList.toggle('text-stone-300', !active)
  })
}

function navigate(page, push = true) {
  const safePage = page === 'guild' ? 'guild' : 'itinerary'
  safePage === 'guild' ? renderGuild(app) : renderItinerary(app)
  setNavigation(safePage)
  if (push) history.pushState({ page: safePage }, '', safePage === 'guild' ? '#guild' : '#itinerary')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

document.addEventListener('click', event => {
  const nav = event.target.closest('[data-nav]')
  if (nav) navigate(nav.dataset.nav)
  const scroll = event.target.closest('[data-scroll]')
  if (scroll) document.querySelector(`#${scroll.dataset.scroll}`)?.scrollIntoView({ behavior: 'smooth' })
})

window.addEventListener('popstate', event => navigate(event.state?.page || location.hash.slice(1), false))
navigate(location.hash === '#guild' ? 'guild' : 'itinerary', false)
