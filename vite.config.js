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
      handler(html) {
        const renderedHtml = renderIncludes(html)

        if (process.env.DEPLOYMENT_STAGE !== 'preview') {
          return renderedHtml
        }

        return {
          html: renderedHtml,
          tags: [
            {
              tag: 'meta',
              attrs: { name: 'robots', content: 'noindex, nofollow' },
              injectTo: 'head',
            },
          ],
        }
      },
    },
  }
}

const pages = [
  'index.html',
  'angebot/index.html',
  'team/index.html',
  'praxis/index.html',
  'kontakt/index.html',
  'notfall/index.html',
  'en/index.html',
  'en/services/index.html',
  'en/team/index.html',
  'en/practice/index.html',
  'en/contact/index.html',
  'en/emergency/index.html',
]
const input = Object.fromEntries(pages.map((page) => [page, resolve(projectRoot, page)]))

export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [htmlIncludes()],
  build: {
    rollupOptions: { input },
  },
})
