import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import AppRoutes from './routes'

const container = document.querySelector('#app')!
createRoot(container).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
)
