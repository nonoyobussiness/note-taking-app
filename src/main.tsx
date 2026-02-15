import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const savedTheme = localStorage.getItem("note-app-color-theme") === "dark"
const savedFont = localStorage.getItem("note-app-font-theme") || "sans"
if (savedTheme) document.documentElement.classList.add("dark")
else document.documentElement.classList.remove("dark")
document.body.classList.add(`font-${savedFont}`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
