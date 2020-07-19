import axios from "axios";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: token } = await axios.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, token);
}

export function loginWithJWT(token) {
  localStorage.setItem(tokenKey, token);
}

export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(tokenKey));
  } catch (error) {}
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  getCurrentUser,
  logout,
  getJWT,
};
