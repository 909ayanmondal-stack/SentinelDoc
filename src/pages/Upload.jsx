import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import { uploadDocument, scoreDocument } from '../api/documents'

function Upload() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [scoring, setScoring] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setResult(null)
        setError('')
    }

    const handleUpload = async () => {
        if (!file) {
            setError('Choose a file first')
            return
        }
        setError('')
        setUploading(true)
        setResult(null)
        try {
            const data = await uploadDocument(file)
            setResult(data)
        } catch (err) {
            setError(err.response?.data?.detail || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleScore = async () => {
        setScoring(true)
        setError('')
        try {
            await scoreDocument(result.document_id)
            navigate(`/results/${result.document_id}`)
        } catch (err) {
            setError(err.response?.data?.detail || 'Scoring failed')
        } finally {
            setScoring(false)
        }
    }

    return (
        <div className="min-h-screen bg-paper">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-semibold text-ink">Upload a document</h2>
                <p className="text-inkgrey mt-2 text-sm mb-8">
                    PDF or DOCX. It'll be split into chunks and checked for trust violations.
                </p>

                <div className="bg-white border border-inkgrey/20 rounded-sm p-8">
                    <label className="block border-2 border-dashed border-inkgrey/30 rounded-sm p-8 text-center cursor-pointer hover:border-ink/40 transition-colors">
                        <input type="file" onChange={handleFileChange} className="hidden" />
                        <p className="text-sm text-ink font-medium">
                            {file ? file.name : 'Click to choose a file'}
                        </p>
                        {!file && <p className="text-xs text-inkgrey mt-1">or drag and drop</p>}
                    </label>

                    <Button className="mt-6" onClick={handleUpload} disabled={uploading || !file}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>

                    {error && (
                        <p className="text-sm text-flag bg-flag/5 border border-flag/20 px-3 py-2 rounded-sm mt-4">
                            {error}
                        </p>
                    )}

                    {result && (
                        <div className="mt-6 pt-6 border-t border-inkgrey/20">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-inkgrey">Document ID</span>
                                <span className="font-mono text-ink text-xs">{result.document_id}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-inkgrey">Chunks</span>
                                <span className="font-mono text-ink">{result.total_chunks}</span>
                            </div>

                            <Button variant="success" onClick={handleScore} disabled={scoring}>
                                {scoring ? 'Running trust scoring...' : 'Run trust scoring'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Upload