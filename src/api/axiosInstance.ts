// src/api/axiosInstance.ts
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'http://90.156.227.120:8000';

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default client;