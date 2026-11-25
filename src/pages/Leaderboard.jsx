import { Link } from "react-router-dom";
import { getLeaderboard } from "../services/Leaderboard";
import { formatDateTime } from "../utils/Constants";
import trofeo from "../assets/trofeo.png";

const Leaderboard = () => {
  const entries = getLeaderboard();

  return (
    <main className="container game-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 d-flex align-items-center">
          <img
            src={trofeo}
            alt="Trofeo"
            title="Trofeo del Leaderboard"
            width="32"
            height="32"
            className="me-2"
          />
          <span>Leaderboard</span>
        </h1>
        <Link to="/" className="btn btn-outline-dark btn-sm">
          Volver al juego
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="alert alert-secondary mb-0" role="alert">
          Todavía no hay puntajes guardados en el Top 10.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Jugador</th>
                <th scope="col">Palabras</th>
                <th scope="col">Puntaje</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>{entry.playerName}</td>
                  <td>{entry.wordsCount}</td>
                  <td className="fw-semibold">{entry.score}</td>
                  <td>{formatDateTime(entry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Leaderboard;