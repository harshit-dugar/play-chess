import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { Game } from './pages/Game'

function App() {

  return (
    <div className='h-screen bg-slate-900'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/game" element={<Game />}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App