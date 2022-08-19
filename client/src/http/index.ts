import axios from "axios";

export const API_URL = "http://mo4-it5:8001/api/";
// export const API_URL = "http://localhost:8001/api/";

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default $api;
