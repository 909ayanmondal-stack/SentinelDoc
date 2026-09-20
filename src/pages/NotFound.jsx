import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-paper px-4">
            <div className="text-center">
                <p className="font-mono text-sm text-inkgrey">404</p>
                <h1 className="text-2xl font-semibold text-ink mt-2">Page not found</h1>
                <p className="text-sm text-inkgrey mt-2">This page doesn't exist.</p>
                <Link to="/login" className="inline-block mt-6 text-ink font-medium text-sm">
                    Back to sign in
                </Link>
            </div>
        </div>
    )
}

export default NotFound