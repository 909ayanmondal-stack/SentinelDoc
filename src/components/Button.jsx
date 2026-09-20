function Button({ children, variant = 'primary', className = '', ...props }) {
    const styles = {
        primary: 'bg-ink hover:bg-ink/90',
        success: 'bg-verified hover:bg-verified/90',
    }

    return (
        <button
            {...props}
            className={`w-full text-white py-2.5 rounded-sm text-sm font-medium disabled:opacity-40 ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button