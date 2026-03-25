import axios from 'axios';
import { BASE_URL } from "./config";



const request = async (method, url, data = null, config = {}) => {
  const userdata = localStorage.getItem("forumuser");
  const parsedUser = userdata ? JSON.parse(userdata) : null;

  const response = await axios({
    method,
    url: `${BASE_URL}/${url}`,
    data,
    headers: {
      Authorization: `Bearer ${parsedUser?.token}`,
      ...(config.headers || {})
    }
  });

  return response.data;
};
const ServiceProvider = {
  create: (formData, url) =>
    request('post', `${url}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  createData: (formData, url) =>
    request('post', `${url}`, formData),

  updateData: (id, formData, url) =>
    request('put', `${url}/${id}`, formData, {
      headers: { 'Content-Type': 'application/json' },
    }),

  getPublished: (url) =>
    request('get', `${url}/getdata`, null,),

  update: (id, formData, url) =>
    request('put', `${url}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getById: (id, url) =>
    request('get', `${url}/getbyid/${id}`, null,),

  trash: (id, url) =>
    request('post', `${url}/${id}`, null),
};

export default ServiceProvider;