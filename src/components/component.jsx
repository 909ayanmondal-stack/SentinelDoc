function Input({ label, ...props }) {
    return (
        <div>
            <label className="text-sm text-ink font-medium">{label}</label>
            <input
                {...props}
                className="w-full mt-1 px-3 py-2 border border-inkgrey/30 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-ink"
            />
        </div>
    )
}

export default Input