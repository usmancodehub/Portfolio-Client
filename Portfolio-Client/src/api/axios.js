import axios from "axios";

const configuredApiUrl = process.env.REACT_APP_API_URL || "https://portfolio-server-wt72.onrender.com";
const API_BASE_URL = `${configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/, "")}/api`;

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const fileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace(/\/api$/, "");
  return `${base}${path}`;
};

export default API;