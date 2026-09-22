import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (process.env.REACT_APP_API_URL || "").replace("/api", "");
  return `${base}${path}`;
};

export default API;