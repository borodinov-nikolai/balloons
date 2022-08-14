import { getStrapiURL } from "./api"
import { ImageType } from "types/general"

export function getStrapiMedia(img: ImageType): string {
  const url = img?.url
  if (url) {
    return url.startsWith("/") ? getStrapiURL(url) : url
  }
  return ""
}
