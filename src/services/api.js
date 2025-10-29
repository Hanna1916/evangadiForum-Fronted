import axios from "axios";

// Base URL from environment
const BASE_URL = "https://evangadi-forum-backend-4c49.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// ===== Auth APIs =====
export const checkUser = () => api.get("/api/user/checkUser");
export const signupUser = (data) => api.post("/api/user/register", data);
export const loginUser = (data) => api.post("/api/user/login", data);

// ===== Questions =====
export const getAllQuestions = () => api.get("/api/question/");
export const getSingleQuestion = (question_id) =>
  api.get(`/api/question/${question_id}`);
export const postQuestion = (data) => api.post("/api/question/", data);

// ===== Answers =====
export const getAnswers = (question_id) =>
  api.get(`/api/answer/${question_id}`);
export const postAnswer = (data) => api.post("/api/answer/", data);

export default api;
