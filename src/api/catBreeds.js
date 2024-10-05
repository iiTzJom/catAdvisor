import axios from "axios";

export const createCatBreedData = async (data) => {
  return axios.post(`http://localhost:3001/createCatBreedData`, data);
};

export const getListCatBreeds = async () => {
  return axios.get(`http://localhost:3001/getListCatBreeds`);
};

export const deleteCatBreeds = async (id) => {
  return axios.delete(`http://localhost:3001/deleteCatBreeds?id=${id}`);
};

export const getCatBreedsDetail = async (id) => {
  return axios.get(`http://localhost:3001/getCatBreedsDetail?id=${id}`);
};

export const updateCatBreeds = async (data) => {
  return axios.put(`http://localhost:3001/updateCatBreeds`, data);
};

export const getCatUser = async () => {
  return axios.get(`http://localhost:3001/getCatUser`);
};
