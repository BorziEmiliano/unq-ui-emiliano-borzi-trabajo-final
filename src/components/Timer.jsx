const Timer = ({ timeLeft, isRunning }) => {
    return (
        <div className="d-inline-flex align-items-center">
            <span className={`badge fs-6 ${isRunning ? (timeLeft <= 5 ? "bg-danger" : "bg-success") : "bg-secondary"}`}>
                Tiempo: {timeLeft}s
            </span>
        </div>
    );
};

export default Timer;