import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import 'bootstrap/js/dist/collapse'

const currentPage = document.body.dataset.page
const activeNavigationLink = document.querySelector(`[data-nav="${currentPage}"]`)

if (activeNavigationLink) {
  activeNavigationLink.setAttribute('aria-current', 'page')
}

const alternatePath = document.body.dataset.alternatePath
const languageSwitch = document.querySelector('[data-language-switch]')

if (alternatePath !== undefined && languageSwitch) {
  languageSwitch.href = `${import.meta.env.BASE_URL}${alternatePath}`
}
