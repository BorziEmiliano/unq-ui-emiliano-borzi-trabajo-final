import axios from "axios";

export const api = axios.create({
  baseURL: "https://word-api-hmlg.vercel.app",
});