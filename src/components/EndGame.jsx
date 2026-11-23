import { useState } from "react";
import { Link } from "react-router-dom";

const EndGame = ({ wordsCount, score, onSaveScore, onReset }) => {
    const [playerName, setPlayerName] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const trimmedName = playerName.trim();

    const handleNameChange = (e) => {
        setPlayerName(e.target.value.replace(/^\s+/, ""));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSaved || !trimmedName) {
            return;
        }

        onSaveScore(trimmedName);
        setIsSaved(true);
    };

    return (
        <div className="alert alert-warning d-inline-block mb-0">
            <p className="mb-2 fw-semibold">¡Se acabó el tiempo!</p>
            <p className="mb-1">
                Palabras encadenadas: <strong>{wordsCount}</strong>
            </p>
            <p className="mb-3">
                Puntaje final: <strong>{score}</strong>
            </p>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group input-group-sm">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tu nombre"
                        value={playerName}
                        onChange={handleNameChange}
                        disabled={isSaved}
                        maxLength={20}
                    />
                    <button type="submit" className="btn btn-success" disabled={isSaved || !trimmedName}>
                        {isSaved ? "Guardado" : "Guardar"}
                    </button>
                </div>
            </form>

            <div className="d-flex gap-2">
                <button type="button" className="btn btn-dark btn-sm" onClick={onReset}>
                    Jugar otra vez
                </button>
                <Link to="/leaderboard" className="btn btn-outline-dark btn-sm">
                    Ver Leaderboard
                </Link>
            </div>
        </div>
    );
};

export default EndGame;