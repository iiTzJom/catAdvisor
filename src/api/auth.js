import axios from "axios";

export const register = async (data) => {
  return axios.post(`http://localhost:3001/createUser`, data);
};

export const checkConfirmUserApi = async (data) => {
  return axios.get(
    `http://localhost:3001/checkDataConfirmUser?id=${data.id}&userName=${data.userName}`
  );
};

export const confirmUserApi = async (data) => {
  return axios.put(`http://localhost:3001/confirmUser`, data);
};
