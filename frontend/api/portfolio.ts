import api from "./axiosClient"

export const getAllWorks = async ({ url }: { url: string }) => {
  try {
    const { data } = await api.get(url)
    return { data }
  } catch (error) {
    throw error
  }
}
