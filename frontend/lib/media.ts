import { ImageType } from "types/general"

export function getMediaUrl(img?: ImageType): string {
  const url = img?.url

  if (url) {
    const baseURL = process.env.NEXT_PUBLIC_URL
    return `${baseURL || "https://linkmusic.ru"}${url}`
  }
  return ""
}
