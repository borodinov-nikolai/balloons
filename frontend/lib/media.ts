import { ImageType } from "types/general"

export function getMediaUrl(img?: ImageType): string {
  const url = img?.url
  if (url) {
    const baseURL = process.env.PUBLIC_URL
    return `${baseURL || "http://localhost:1337"}${url}`
  }
  return ""
}
