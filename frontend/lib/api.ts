import axios, { AxiosInstance } from "axios"
import qs from "qs"

export function getStrapiURL(path = "") {
  const baseURL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")
  return `${baseURL || "http://localhost:1337"}${path}`
}

export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})
