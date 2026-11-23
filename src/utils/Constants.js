export const TURN_SECONDS = 15;

export const removeAccents = (letter) => letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const normalizeWord = (text) => removeAccents(text.trim()).toLowerCase();