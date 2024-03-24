import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../models/User"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { logout } from "../redux/slices/user"
import DarkModeToggle from "./DarkModeToggle"

const Navbar = () => {
    const user: User = useSelector((state: any) => state.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState<boolean>(false)

    const handleLogout = () => {
        axios.get('/auth/logout').then(() => {
            dispatch(logout())
            localStorage.removeItem('conversation');
            navigate('/login')
        })
    }

    const handleNavbarLinks = () => {
        if (user.id !== -1) {
            return (
                <>
                    <li><span className="text-white font-bold flex justify-center items-center gap-3">{user.username} <img src={user.avatar} className="w-10 h-10 rounded-full" /></span></li>
                    <li><button onClick={handleLogout} className="text-black bg-white px-4 py-2 rounded hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-white w-full">Log Out</button></li>
                </>
            )
        }
        else {
            return (
                <>
                    <li><a href="/login" className="text-white px-4 py-2 rounded w-full">Log In</a></li>
                    <li><a href="/login" className="text-white px-4 py-2 rounded w-full">Sign Up</a></li>
                </>
            )
        }

    }

    return (
        <header className="bg-slate-900">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <a href="/">ShoryuChat</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-5">
                            <DarkModeToggle/>
                            {handleNavbarLinks()}
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setOpen(!open)} className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {open && <div className="md:hidden mobile-menu">
                    <ul className="mt-4 space-y-4">
                        {handleNavbarLinks()}
                    </ul>
                </div>}

            </nav>
        </header>
    )
}

export default Navbar