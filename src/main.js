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

const designOptions = [...document.querySelectorAll('[data-design-option]')]
const supportedDesigns = new Set(['new', 'legacy'])
const designStorageKey = 'praxis-preview-design'

const getStoredDesign = () => {
  try {
    return localStorage.getItem(designStorageKey)
  } catch {
    return null
  }
}

const storeDesign = (design) => {
  try {
    localStorage.setItem(designStorageKey, design)
  } catch {
    // The comparison still works when storage is disabled.
  }
}

const updateDesignUrl = (design) => {
  const url = new URL(window.location.href)

  if (design === 'new') {
    url.searchParams.delete('design')
  } else {
    url.searchParams.set('design', design)
  }

  history.replaceState({}, '', url)
}

const applyDesign = (design, { persist = true, updateUrl = true } = {}) => {
  const selectedDesign = supportedDesigns.has(design) ? design : 'new'
  document.documentElement.dataset.design = selectedDesign

  designOptions.forEach((option) => {
    option.setAttribute('aria-pressed', String(option.dataset.designOption === selectedDesign))
  })

  if (persist) storeDesign(selectedDesign)
  if (updateUrl) updateDesignUrl(selectedDesign)
}

const requestedDesign = new URLSearchParams(window.location.search).get('design')
const initialDesign = supportedDesigns.has(requestedDesign) ? requestedDesign : getStoredDesign()

applyDesign(initialDesign, { persist: false, updateUrl: false })

designOptions.forEach((option) => {
  option.addEventListener('click', () => applyDesign(option.dataset.designOption))
})

const paletteOptions = [...document.querySelectorAll('[data-palette-option]')]
const supportedPalettes = new Set(['1', '2', '3'])
const paletteStorageKey = 'praxis-preview-palette'

const getStoredPalette = () => {
  try {
    return localStorage.getItem(paletteStorageKey)
  } catch {
    return null
  }
}

const storePalette = (palette) => {
  try {
    localStorage.setItem(paletteStorageKey, palette)
  } catch {
    // The comparison still works when storage is disabled.
  }
}

const updatePaletteUrl = (palette) => {
  const url = new URL(window.location.href)

  if (palette === '1') {
    url.searchParams.delete('palette')
  } else {
    url.searchParams.set('palette', palette)
  }

  history.replaceState({}, '', url)
}

const applyPalette = (palette, { persist = true, updateUrl = true } = {}) => {
  const selectedPalette = supportedPalettes.has(palette) ? palette : '1'
  document.documentElement.dataset.palette = selectedPalette

  paletteOptions.forEach((option) => {
    option.setAttribute('aria-pressed', String(option.dataset.paletteOption === selectedPalette))
  })

  const selectedOption = paletteOptions.find(
    (option) => option.dataset.paletteOption === selectedPalette,
  )
  requestAnimationFrame(() => {
    selectedOption?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' })
  })

  if (persist) storePalette(selectedPalette)
  if (updateUrl) updatePaletteUrl(selectedPalette)
}

const requestedPalette = new URLSearchParams(window.location.search).get('palette')
const initialPalette = supportedPalettes.has(requestedPalette)
  ? requestedPalette
  : getStoredPalette()

applyPalette(initialPalette, { persist: false, updateUrl: false })

paletteOptions.forEach((option) => {
  option.addEventListener('click', () => applyPalette(option.dataset.paletteOption))
})
