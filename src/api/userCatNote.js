import axios from "axios";

export const createCatNote = async (data) => {
  return axios.post(`http://localhost:3001/createCatNote`, data);
};

export const getCatNoteByUser = async (userName) => {
  return axios.get(
    `http://localhost:3001/getCatNoteByUser?userName=${userName}`
  );
};

export const deleteCatNoteByUser = async (userName, id) => {
  return axios.delete(
    `http://localhost:3001/deleteCatNote?userName=${userName}&id=${id}`
  );
};

export const updateCatNoteByUser = async (data) => {
  return axios.put(`http://localhost:3001/updateCatNote?`, data);
};
