import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getReports = async () => {

  const response = await axios.get(
    `${API_URL}/reports`
  );

  return response.data;

};