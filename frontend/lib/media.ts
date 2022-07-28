import { getStrapiURL } from "./api"
import { MediaType } from "types/general"

export function getStrapiMedia(media: MediaType) {
  if (media?.data) {
    const { url } = media.data.attributes
    return url.startsWith("/") ? getStrapiURL(url) : url
  }
  return ""
}
