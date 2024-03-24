import Chat from "./components/ChatComponents/Chat"
import Login from "./components/LoginComponents/Login"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./redux/slices/user"


function App() {
  
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.value)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios.get('/auth/current_user')
    .then((res) => {
      console.log(res.data)
      dispatch(login(res.data))
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      console.log(err)
    })
  }, [])

  // TODO: Add loading component
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={user.id !== -1 ? <Chat/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={user.id === -1 ? <Login/> : <Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
