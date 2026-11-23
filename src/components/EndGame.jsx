import { Link } from "react-router-dom";

const EndGame = ({ wordsCount, score, onReset }) => {
    return (
        <div className="alert alert-warning d-inline-block mb-0">
            <p className="mb-2 fw-semibold">¡Se acabó el tiempo!</p>
            <p className="mb-1">
                Palabras encadenadas: <strong>{wordsCount}</strong>
            </p>
            <p className="mb-3">
                Puntaje final: <strong>{score}</strong>
            </p>
            <div className="d-flex gap-2">
                <button type="button" className="btn btn-dark btn-sm" onClick={onReset}>
                    Reiniciar
                </button>
                <Link to="/leaderboard" className="btn btn-outline-dark btn-sm">
                    Leaderboard
                </Link>
            </div>
        </div>
    );
};

export default EndGame;