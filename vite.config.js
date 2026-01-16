
import { defineConfig } from 'vite'
import vituum from 'vituum'
import posthtml from '@vituum/vite-plugin-posthtml'
import postcss from '@vituum/vite-plugin-postcss'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'

export default defineConfig({
  base: '',
  plugins: [
    vituum({
      pages: {
        dir: 'src/pages'
      }
    }),
    postcss(),
    posthtml(),
    tailwindcss(),
    {
      name: 'remove-crossorigin',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/\s*crossorigin(="[^"]*")?/g, '')
      }
    },
    {
      name: 'replace-assets-path-in-html',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/\.\.\/\.\.\/assets/g, './assets')
      }
    },
    {
      name: 'replace-img-path-in-html',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/\.\.\/\.\.\/img/g, './img')
      }
    }
  ],
  build: {
    minify: false,
    modulePreload: {
      polyfill: false
    }
  }
})
