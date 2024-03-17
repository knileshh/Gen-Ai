import { useState } from 'react'
import './App.css'
import  {MainnDiv} from "./components/MainnDiv.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MainnDiv/>

    </>
  )
}

export default App
