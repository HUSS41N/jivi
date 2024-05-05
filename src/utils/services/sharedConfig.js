import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "https://httpbin.org",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
