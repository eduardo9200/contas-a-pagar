import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function get(resource) {
  const response = await axios.get(`${BASE_URL}/${resource}`);
  return response.data;
}

export async function getById(resource, id) {
  const response = await axios.get(`${BASE_URL}/${resource}/${id}`);
  return response.data;
}

export async function post(resource, params) {
  const response = await axios.post(`${BASE_URL}/${resource}`, params);
  return response.data;
}

export async function deleteResource(resource) {
  const response = await axios.delete(`${BASE_URL}/${resource}`);
  return response.data;
}

export async function change(resource, params) {
  const response = await axios.put(`${BASE_URL}/${resource}`, params);
  return response.data;
}

export async function patch(resource) {
  const response = await axios.patch(`${BASE_URL}/${resource}`);
  return response.data;
}