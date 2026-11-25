const WordChain = ({ words }) => {
    if (!words || words.length === 0) return null;

    return (
        <div className="mb-3">
            <h2 className="h6 text-dark fw-semibold mb-2">Cadena actual:</h2>
            <div className="d-flex flex-wrap align-items-center gap-1">
                {words.map((usedWord, index) => (
                    <span key={`${usedWord}-${index}`} className="d-inline-flex align-items-center gap-1">
                        <span className="badge bg-dark text-white border fs-6 fw-normal">
                            {usedWord.toLowerCase()}
                        </span>
                        {index < words.length - 1 && (
                            <span className="text-muted small">{"->"}</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default WordChain;