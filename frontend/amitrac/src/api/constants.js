import axios from 'axios';

export const BASE_API = process.env.REACT_APP_BASE_API;

export const api = axios.create({
  baseURL: BASE_API,
  timeout: 50000,
});