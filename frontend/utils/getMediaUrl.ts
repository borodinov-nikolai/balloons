import { ImageType } from "types/common"

export function getMediaUrl(img?: ImageType): string {
  const url = img?.url

  if (url) {
    const baseURL = process.env.NEXT_PUBLIC_SERVER_URL
    return `${baseURL}`
  }
  return ""
}
