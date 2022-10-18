import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
// export const API_URL = "http://localhost:8001/api/";

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default $api;
