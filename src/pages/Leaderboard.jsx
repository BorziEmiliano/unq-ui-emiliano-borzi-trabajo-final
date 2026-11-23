import { Link } from "react-router-dom";

const Leaderboard = () => {
  return (
    <main className="container game-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Leaderboard</h1>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Volver al juego
        </Link>
      </div>
    </main>
  );
};

export default Leaderboard;