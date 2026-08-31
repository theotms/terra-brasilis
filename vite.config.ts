import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/terra-brasilis/' : '/',
  plugins: [react()],
  appType: 'mpa',
  input: {
    home: 'index.html',
    collection: 'collection/index.html',
    story: 'story/index.html',
    makers: 'makers/index.html',
    personalize: 'personalize/index.html',
    contact: 'contact/index.html',
  },
}))
