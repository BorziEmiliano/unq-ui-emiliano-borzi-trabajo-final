import { LEADERBOARD_STORAGE_KEY, TOP_LIMIT } from "../utils/Constants";

export const getLeaderboard = () => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveScoreEntry = ({ playerName, score, wordsCount }) => {
  const cleanName = typeof playerName === "string" ? playerName.trim() : "";
  if (!cleanName) {
    return getLeaderboard();
  }

  const currentEntries = getLeaderboard();

  const newEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    playerName: cleanName,
    score,
    wordsCount,
    createdAt: Date.now(),
  };

  const updatedTop10 = [...currentEntries, newEntry]
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.wordsCount - a.wordsCount;
    })
    .slice(0, TOP_LIMIT);

  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedTop10));
  return updatedTop10;
};