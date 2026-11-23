const Timer = ({ timeLeft, isRunning }) => {
    return (
        <div className="mb-3 d-flex align-items-center gap-2">
            <span className={`badge fs-6 ${isRunning ? (timeLeft <= 5 ? "bg-danger" : "bg-success") : "bg-secondary"}`}>
                Tiempo: {timeLeft}s
            </span>
        </div>
    );
};

export default Timer;