import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Timer from "../components/Timer";
import WordForm from "../components/WordForm";
import WordChain from "../components/WordChain";
import EndGame from "../components/EndGame";
import { validateWord } from "../services/Validate";
import { saveScoreEntry } from "../services/Leaderboard";
import { TURN_SECONDS, normalizeWord } from "../utils/Constants";
import logo from "../assets/logo.png";

const Home = () => {
  const [word, setWord] = useState("");
  const [lastValidWord, setLastValidWord] = useState("");
  const [usedWords, setUsedWords] = useState([]);
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

  const requiredLetter = lastValidWord ? normalizeWord(lastValidWord.slice(-1)) : "";

  const score = usedWords.reduce((total, currentWord) => total + currentWord.length, 0);

  const handleWordChange = (value) => {
    setWord(value.replace(/\s+/g, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "finished" || isChecking) return;

    if (!word) {
      setFeedback({
        type: "danger",
        text: "Inserta una palabra",
      });
      return;
    }

    setFeedback(null);

    const rejectWord = (text) => {
      setWord("");
      setFeedback({ type: "danger", text });
    };

    if (requiredLetter && normalizeWord(word[0]) !== requiredLetter) {
      rejectWord(`Debe empezar con "${requiredLetter.toUpperCase()}"`);
      return;
    }

    const normalizedCandidate = normalizeWord(word);
    const alreadyUsed = usedWords.some(
      (existingWord) => normalizeWord(existingWord) === normalizedCandidate
    );

    if (alreadyUsed) {
      rejectWord("La palabra ya fue utilizada");
      return;
    }

    setIsChecking(true);

    try {
      const data = await validateWord(word);

      if (!data?.exists) {
        rejectWord("Palabra inválida");
        return;
      }

      setUsedWords((prev) => [...prev, word]);
      setLastValidWord(word);
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
      rejectWord("No se pudo validar la palabra. Intentá de nuevo.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSaveScore = (playerName) => {
    saveScoreEntry({
      playerName,
      score,
      wordsCount: usedWords.length,
    });
  };

  const handleReset = () => {
    setWord("");
    setLastValidWord("");
    setUsedWords([]);
    setTimeLeft(TURN_SECONDS);
    setStatus("idle");
    setFeedback(null);
    setIsChecking(false);
  };

  return (
    <main className="container game-container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 d-flex align-items-center">
          <img
            src={logo}
            alt="Diccionario"
            title="Palabras encadenadas logo"
            width="34"
            height="34"
            className="me-2"
          />
          <span>Palabras encadenadas</span>
        </h1>
        {status === "idle" && (
          <Link to="/leaderboard" className="btn btn-outline-dark btn-sm">
            Leaderboard
          </Link>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Timer timeLeft={timeLeft} isRunning={status === "running"} />

        {status !== "finished" && (
          <p className="mb-0">
            <span className="fs-5 fw-bold text-dark">
              Puntaje: {score}
            </span>
          </p>
        )}
      </div>

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

      <WordChain words={usedWords} />

      {status === "finished" && (
        <EndGame
          wordsCount={usedWords.length}
          score={score}
          onSaveScore={handleSaveScore}
          onReset={handleReset}
        />
      )}
    </main>
  );
};

export default Home;