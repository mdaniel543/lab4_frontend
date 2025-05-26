import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://18.119.137.129:80";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});