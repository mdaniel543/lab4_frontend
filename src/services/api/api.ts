import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://3.144.12.232";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});