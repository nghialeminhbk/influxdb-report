const CardContent = ({ children }) => {
    return (
        <div
            style={{
                marginBottom: '16px',
                padding: 16,
                background: "white",
                borderRadius: "0.25rem",
                boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)"
            }}
        >
            {children}
        </div>
    )
}

export default CardContent