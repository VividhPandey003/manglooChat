import './App.css'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp'

function App() {

  return (
    <div className='p-4 h-screen flex flex-col items-center justify-center'>
      <Login /> . 
      <SignUp />
    </div>
  )
}

export default App
