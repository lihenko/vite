
import { defineConfig } from 'vite'
import vituum from 'vituum'
import posthtml from '@vituum/vite-plugin-posthtml'
import postcss from '@vituum/vite-plugin-postcss'
import tailwindcss from '@vituum/vite-plugin-tailwindcss'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '',
  plugins: [
    vituum({
      pages: {
        dir: 'src/pages'
      }
    }),
    ViteImageOptimizer({
      // обробляємо тільки public/img
      include: ['/src/img/**/*.{png,jpg,jpeg}'],
      exclude: ['/src/img/**/*.svg'],

      // завжди генеруємо webp
      webp: {
        lossless: true
      },

      // відключаємо оптимізацію оригіналів
      png: false,
      jpeg: false,
      jpg: false,
      svg: false
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
    },
    {
    name: 'html-img-to-webp',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /(<img[^>]+src=["'])([^"']+\.(png|jpe?g))(["'])/gi,
        (_, p1, src, _ext, p4) =>
          `${p1}${src.replace(/\.(png|jpe?g)$/i, '.webp')}${p4}`
      )
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
