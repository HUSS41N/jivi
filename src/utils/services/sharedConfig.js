import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
