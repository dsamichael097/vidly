import axios from "axios";
import { apiUrl } from "../config.json";
import auth from "../services/authService";
const apiEndPoint = apiUrl + "/movies";

export function getMovies() {
  return axios.get(apiEndPoint);
}

export function getMovie(id) {
  return axios.get(`${apiEndPoint}/${id}`);
}

export function saveMovie(movie, id) {
  //console.log(auth.getJWT());
  if (movie._id) delete movie._id;
  if (id === "new")
    return axios.post(apiEndPoint, movie, {
      headers: { "x-auth-token": auth.getJWT() },
    });
  else
    return axios.put(`${apiEndPoint}/${id}`, movie, {
      headers: { "x-auth-token": auth.getJWT() },
    });
}

export function deleteMovie(id) {
  return axios.delete(`${apiEndPoint}/${id}`, {
    headers: { "x-auth-token": auth.getJWT() },
  });
}
