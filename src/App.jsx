import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Dashboard from './pages/admin/Dashboard'




function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  )
}

export default App
