import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getCases = async () => {

  const response = await axios.get(
    `${API_URL}/cases`
  );

  return response.data;

};

export const createCase = async (caseData) => {

  const response = await axios.post(
    `${API_URL}/cases/create`,
    caseData
  );

  return response.data;

};