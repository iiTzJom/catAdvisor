import axios from "axios";

export const sendLineNotification = async (data) => {
  return axios.post(`http://localhost:3001/sendLineNotification`, data);
};

export const updateTokken = async (data) => {
  return axios.put(`http://localhost:3001/updateTokken`, data);
};

export const createVacine = async (data) => {
  return axios.post(`http://localhost:3001/createVacine`, data);
};

export const createVacineNoti = async (data) => {
  return axios.post(`http://localhost:3001/createVacineNoti`, data);
};

export const getVacineByUser = async (userName) => {
  return axios.get(
    `http://localhost:3001/getVacineByUser?userName=${userName}`
  );
};

export const deleteVacine = async (userName, id) => {
  return axios.delete(
    `http://localhost:3001/deleteVacine?userName=${userName}&id=${id}`
  );
};

export const updateVacine = async (data) => {
  return axios.put(`http://localhost:3001/updateVacine`, data);
};

export const getVacineList = async (userName) => {
  return axios.get(`http://localhost:3001/getVacineList`);
};
