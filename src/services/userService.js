import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

export function registerUser(user) {
  return axios.post(apiEndPoint, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}
