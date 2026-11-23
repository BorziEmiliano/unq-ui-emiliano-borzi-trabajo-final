import { api } from "./Api";

export const validateWord = async (word) => {
  const response = await api.get(`/api/validate?word=${encodeURIComponent(word)}`);
  return response.data;
};