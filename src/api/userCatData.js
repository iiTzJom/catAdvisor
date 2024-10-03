import axios from "axios";

export const createCatData = async (data) => {
  return axios.post(`http://localhost:3001/createCatData`, data);
};

export const getCatByUser = async (userName) => {
  return axios.get(`http://localhost:3001/getCatByUser?userName=${userName}`);
};

export const deleteCatByUser = async (userName, id) => {
  return axios.delete(
    `http://localhost:3001/deleteCatByUser?userName=${userName}&id=${id}`
  );
};

export const updateCatByUser = async (data) => {
  return axios.put(`http://localhost:3001/updateCatByUser?`, data);
};
