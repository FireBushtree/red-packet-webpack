import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from '@/App'
import './index.css'

const container = document.querySelector('#app')!
createRoot(container).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App message="kkk" />} />
      <Route path="test" element={<App message="test" />} />
    </Routes>
  </BrowserRouter>,
)
