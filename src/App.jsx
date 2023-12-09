import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './Components/Login/Login'
import SignUp from './Components/Signup/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SignUp></SignUp>
    </>
  )
}

export default App
