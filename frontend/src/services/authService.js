import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const registerUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/auth/register`,
    userData
  );

  return response.data;

};

export const loginUser = async (loginData) => {

  const response = await axios.post(
    `${API_URL}/auth/login`,
    loginData
  );

  return response.data;
};