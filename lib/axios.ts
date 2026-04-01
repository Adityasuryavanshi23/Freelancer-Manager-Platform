import axios from "axios";

export const api = axios.create({
  baseURL: "https://freelancer-manager-platform.vercel.app/api",
});
