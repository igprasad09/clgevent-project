import { useState } from 'react'
import './App.css'
import EventPortal from './components/EventPortal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <EventPortal/>
    </>
  )
}

export default App
