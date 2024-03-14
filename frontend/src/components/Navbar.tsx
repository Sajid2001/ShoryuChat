import { useDispatch, useSelector } from "react-redux"
import { User } from "../models/User"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { logout } from "../redux/slices/user"

const Navbar = () => {
    const user: User = useSelector((state: any) => state.user.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        axios.get('/auth/logout').then(() => {
            dispatch(logout())
            localStorage.clear()
            navigate('/login')
        })
    }

    const handleNavbarLinks = () => {
        if (user.id !== -1) {
            return (
                <>
                    <li><span className="text-white font-bold flex justify-center items-center gap-5">{user.username} <img src={user.avatar} className="w-10 h-10 rounded-full" /></span></li>
                    <li><button onClick={handleLogout} className="text-black bg-white px-4 py-2 rounded hover:bg-slate-200">Log Out</button></li>
                </>
            )
        }

    }

    return (
        <header className="bg-gray-800">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <a href="/">SF Chat</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            {handleNavbarLinks()}
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mobile-menu hidden md:hidden">
                    <ul className="mt-4 space-y-4">
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Home</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">About</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Services</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Contact</a></li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default Navbar