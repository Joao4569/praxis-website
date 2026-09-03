import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const projectRoot = import.meta.dirname

function htmlIncludes() {
  const includePattern = /<!--\s*@include\s+([^\s]+)\s*-->/g

  const renderIncludes = (html) =>
    html.replace(includePattern, (_, includePath) => {
      const partial = readFileSync(resolve(projectRoot, includePath), 'utf8')
      return renderIncludes(partial)
    })

  return {
    name: 'praxis-html-includes',
    transformIndexHtml: {
      order: 'pre',
      handler: renderIncludes,
    },
  }
}

const pages = ['index.html', 'en/index.html']
const input = Object.fromEntries(pages.map((page) => [page, resolve(projectRoot, page)]))

export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [htmlIncludes()],
  build: {
    rollupOptions: { input },
  },
})
