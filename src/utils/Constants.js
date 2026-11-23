export const TURN_SECONDS = 15;

export const LEADERBOARD_STORAGE_KEY = "leaderboard";

export const TOP_LIMIT = 10;

export const removeAccents = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const normalizeWord = (text) => removeAccents(text.trim()).toLowerCase();

export const formatDateTime = (entry) => {
  if (entry.createdAt) {
    return new Date(entry.createdAt)
      .toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(", ", " ");
  }

  return "-";
};