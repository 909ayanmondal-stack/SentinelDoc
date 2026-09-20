import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Dashboard() {
    return (
        <div className="min-h-screen bg-paper">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-semibold text-ink">Inspect a document</h2>
                <p className="text-inkgrey mt-2 text-sm">
                    Upload a file to run it through trust scoring and see flagged content.
                </p>

                <Link
                    to="/upload"
                    className="inline-block mt-6 bg-ink text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-ink/90"
                >
                    Upload document
                </Link>
            </div>
        </div>
    )
}

export default Dashboard