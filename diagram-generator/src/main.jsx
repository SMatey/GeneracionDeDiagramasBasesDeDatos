import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Body } from './Body'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Body />
  </StrictMode>,
)
