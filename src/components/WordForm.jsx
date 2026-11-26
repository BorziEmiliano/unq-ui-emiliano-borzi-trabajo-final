const WordForm = ({
    word,
    onChange,
    onSubmit,
    requiredLetter,
    isChecking,
    disabled,
    inputRef,
}) => {
    return (
        <form onSubmit={onSubmit} className="mb-3">
            {requiredLetter && (
                <div className="mb-2">
                    <span className="text-muted me-2">Debe empezar con:</span>
                    <span className="badge bg-danger fs-6 text-uppercase">
                        {requiredLetter}
                    </span>
                </div>
            )}

            <div className="input-group focus-ring focus-ring-primary">
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control shadow-none"
                    value={word}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={
                        requiredLetter
                            ? `Palabra que empiece con "${requiredLetter.toUpperCase()}"..`
                            : "Ingresá tu primera palabra.."
                    }
                    disabled={disabled || isChecking}
                />
                <button type="submit" className="btn btn-primary" disabled={disabled || isChecking}>
                    {isChecking ? "Validando.." : "Enviar"}
                </button>
            </div>
        </form>
    );
};

export default WordForm;