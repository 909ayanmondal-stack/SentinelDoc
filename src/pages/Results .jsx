import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getResults } from '../api/documents'

function Results() {
    const { documentId } = useParams()
    const [chunks, setChunks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [onlyTrustworthy, setOnlyTrustworthy] = useState(false)

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true)
            setError('')
            try {
                const data = await getResults(documentId, onlyTrustworthy)
                setChunks(data.chunks)
            } catch (err) {
                setError(err.response?.data?.detail || 'Failed to load results')
            } finally {
                setLoading(false)
            }
        }
        fetchResults()
    }, [documentId, onlyTrustworthy])

    return (
        <div className="min-h-screen bg-paper">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-ink">Inspection results</h2>
                        <p className="text-xs font-mono text-inkgrey mt-1">{documentId}</p>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-inkgrey cursor-pointer">
                        <input
                            type="checkbox"
                            checked={onlyTrustworthy}
                            onChange={(e) => setOnlyTrustworthy(e.target.checked)}
                            className="accent-ink"
                        />
                        Trustworthy only
                    </label>
                </div>

                {loading && <p className="text-sm text-inkgrey">Loading results...</p>}
                {error && (
                    <p className="text-sm text-flag bg-flag/5 border border-flag/20 px-3 py-2 rounded-sm">
                        {error}
                    </p>
                )}

                {!loading && !error && chunks.length === 0 && (
                    <p className="text-sm text-inkgrey">No chunks match this filter.</p>
                )}

                <div className="divide-y divide-inkgrey/15 border border-inkgrey/20 rounded-sm bg-white">
                    {chunks.map((chunk) => {
                        const isTrustworthy = chunk.status === 'trustworthy'
                        return (
                            <div key={chunk.chunk_index} className="p-5">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <span className="font-mono text-xs text-inkgrey pt-0.5">
                                        #{String(chunk.chunk_index).padStart(3, '0')}
                                    </span>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-sm shrink-0 ${isTrustworthy
                                            ? 'bg-verified/10 text-verified'
                                            : 'bg-flag/10 text-flag'
                                            }`}
                                    >
                                        {isTrustworthy ? 'Trustworthy' : 'Flagged'} · {chunk.trust_score}%
                                    </span>
                                </div>

                                <p className="text-sm text-ink leading-relaxed">{chunk.cleaned_text}</p>

                                {chunk.violations?.length > 0 && (
                                    <p className="text-xs text-flag mt-2">
                                        {chunk.violations.join(' · ')}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Results