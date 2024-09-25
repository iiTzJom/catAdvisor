import axios from "axios";

export const register = async (data) => {
  return axios.post(`http://localhost:3001/createUser`, data);
};
