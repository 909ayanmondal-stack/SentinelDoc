import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await loginUser(username, password)
            login(data.access_token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white border-t-4 border-ink rounded-sm shadow-sm p-8">
                <h1 className="text-xl font-semibold text-ink">SentinelDoc</h1>
                <p className="text-sm text-inkgrey mt-1 mb-6">Sign in to inspect documents</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-sm text-flag bg-flag/5 border border-flag/20 px-3 py-2 rounded-sm">
                            {error}
                        </p>
                    )}

                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <p className="text-sm text-inkgrey mt-6">
                    No account?{' '}
                    <Link to="/signup" className="text-ink font-medium">Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login