import axios, { AxiosInstance } from "axios"
import qs from "qs"

export const API: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://linkmusic.ru/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

// @ts-ignore
API.paramsSerializer = (p) => {
  return qs.stringify(p, { arrayFormat: "brackets" })
}
