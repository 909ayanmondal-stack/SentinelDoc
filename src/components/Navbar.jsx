import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-ink px-6 py-4 flex justify-between items-center">
            <Link to="/dashboard" className="text-white font-semibold tracking-tight">
                SentinelDoc
            </Link>
            <button
                onClick={handleLogout}
                className="text-sm text-white/70 hover:text-white transition-colors"
            >
                Logout
            </button>
        </nav>
    )
}

export default Navbar