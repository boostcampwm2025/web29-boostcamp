import { Routes, Route } from 'react-router-dom'
import Problem from '@/pages/Problem'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Problem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
