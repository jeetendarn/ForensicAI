import axios from "axios";

export const getFindings = async(id) => {

  const response = await axios.get(
    `http://127.0.0.1:8000/findings/${id}`
  );

  return response.data;

};