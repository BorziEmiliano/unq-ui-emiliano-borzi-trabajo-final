import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
import WordForm from "../components/WordForm";
import { validateWord } from "../services/Validate";
import { TURN_SECONDS, removeAccents } from "../utils/Constants";

const Home = () => {
  const [word, setWord] = useState("");
  const [lastValidWord, setLastValidWord] = useState("");
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (status !== "running" || isChecking) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, isChecking]);

  useEffect(() => {
    if (!isChecking && status !== "finished") {
      inputRef.current?.focus();
    }
  }, [isChecking, status]);

  useEffect(() => {
    if (!feedback || feedback.type !== "success") return;

    const timeoutId = setTimeout(() => {
      setFeedback(null);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [feedback]);

  const requiredLetter = lastValidWord ? removeAccents(lastValidWord.slice(-1)) : "";

  const handleWordChange = (value) => {
    setWord(value.replace(/^\s+/, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "finished" || isChecking) return;

    const cleanWord = word.trim();
    if (!cleanWord) {
      setFeedback({
        type: "danger",
        text: "Inserta una palabra",
      });
      inputRef.current?.focus();
      return;
    }

    setFeedback(null);

    if (requiredLetter && removeAccents(cleanWord[0]) !== requiredLetter) {
      setWord("");
      setFeedback({
        type: "danger",
        text: `Debe empezar con "${requiredLetter.toUpperCase()}"`,
      });
      inputRef.current?.focus();
      return;
    }

    setIsChecking(true);

    try {
      const data = await validateWord(cleanWord);

      if (!data?.exists) {
        setWord("");
        setFeedback({
          type: "danger",
          text: "Palabra inválida",
        });
        return;
      }

      setLastValidWord(cleanWord);
      setTimeLeft(TURN_SECONDS);
      setWord("");
      setFeedback({
        type: "success",
        text: "Palabra válida",
      });

      if (status === "idle") {
        setStatus("running");
      }
    } catch (error) {
      setWord("");
      setFeedback({
        type: "danger",
        text: "No se pudo validar la palabra. Intentá de nuevo."
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleReset = () => {
    setWord("");
    setLastValidWord("");
    setTimeLeft(TURN_SECONDS);
    setStatus("idle");
    setFeedback(null);
    setIsChecking(false);
  };

  return (
    <main className="container game-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Palabras encadenadas</h1>
        {status === "idle" && (
          <Link to="/leaderboard" className="btn btn-outline-dark btn-sm">
            Leaderboard
          </Link>
        )}
      </div>

      <Timer timeLeft={timeLeft} isRunning={status === "running"} />

      <WordForm
        inputRef={inputRef}
        word={word}
        onChange={handleWordChange}
        onSubmit={handleSubmit}
        requiredLetter={requiredLetter}
        isChecking={isChecking}
        disabled={status === "finished"}
      />

      {feedback && (
        <div className={`alert alert-${feedback.type} d-inline-block py-1 px-3 mb-2`} role="alert">
          {feedback.text}
        </div>
      )}

      {lastValidWord && (
        <p className="mb-3">
          Última palabra: <strong>{lastValidWord}</strong>
        </p>
      )}

      {status === "finished" && (
        <div className="alert alert-warning d-inline-block mb-0">
          <p className="mb-2 fw-semibold">¡Se acabó el tiempo!</p>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-dark btn-sm" onClick={handleReset}>
              Reiniciar
            </button>
            <Link to="/leaderboard" className="btn btn-outline-dark btn-sm">
              Leaderboard
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;