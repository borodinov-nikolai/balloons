import api from "./axiosClient"

export const getAllNews = async ({ url }: { url: string }) => {
  try {
    const { data } = await api.get(url)
    return { data }
  } catch (error) {
    throw error
  }
}

export const getNews = async ({ url }: { url: string }) => {
  try {
    const { data } = await api.get(url)
    return { data }
  } catch (error) {
    throw error
  }
}
