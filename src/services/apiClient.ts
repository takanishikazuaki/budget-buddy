import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'  // FastAPIのベースURL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
