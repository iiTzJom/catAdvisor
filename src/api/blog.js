import axios from "axios";

export const createBlog = async (data) => {
  return axios.post(`http://localhost:3001/createBlog`, data);
};

export const getBlogList = async () => {
  return axios.get(`http://localhost:3001/getBlogList`);
};

export const deleteBlog = async (id) => {
  return axios.delete(`http://localhost:3001/deleteBlog?id=${id}`);
};
