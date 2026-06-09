import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getEvidence = async () => {
  const response = await axios.get(`${API_URL}/admin/evidence/`);
  return response.data;
};

export const uploadEvidence = async (formData) => {
  const response = await axios.post(
    `${API_URL}/evidence/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};