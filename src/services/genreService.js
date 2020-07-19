import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/genres";

export function getGenres() {
  return axios.get(apiEndPoint);
}
