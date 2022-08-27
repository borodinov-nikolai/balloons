import axios, { AxiosInstance } from "axios"
import qs from "qs"

export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})
