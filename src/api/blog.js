import axios from "axios";

export const createBlog = async (data) => {
  return axios.post(`http://localhost:3001/createBlog`, data);
};

export const getBlogList = async () => {
  return axios.get(`http://localhost:3001/getBlogList`);
};

export const getBlogDetail = async (id) => {
  return axios.get(`http://localhost:3001/getBlogDetail?id=${id}`);
};

export const deleteBlog = async (id) => {
  return axios.delete(`http://localhost:3001/deleteBlog?id=${id}`);
};

export const updateBlogDetail = async (data) => {
  return axios.put(`http://localhost:3001/updateBlogDetail`, data);
};
