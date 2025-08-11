import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000
})

// pyDolarVenezuela API (para tasa)
export const pydolarApi = axios.create({
  baseURL: 'https://pydolarve.org',
  timeout: 8000
})
