import { UserType } from "./auth"

export type ImageType = {
  url: string
  extension: string
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  formats: object
  hash: string
  height: number
  id: number
  mime: string
  name: string
  previewUrl: string
  provider: string
  provider_metadata: string
  size: number
  updatedAt: string
  width: number
}

export type ReleaseType = {
  id: string
  type: "single" | "album"
  name: string
  artistName?: string
  date: number
  user: UserType
  platformLinks: PlatformLinkType[]
  video?: string
  vkPixel?: string
  facebookPixel?: string
  link: string
  img: ImageType
  createdAt: string
  updatedAt: string
}

export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export type ReleaseData = {
  release: ReleaseType
}

export type SocialLinkType = {
  id: string
  name: string
  link: string
}

export type UserSocialLinksType = {
  vk?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  instagram?: string
}

export type FeedbackFormType = {
  messageSubject: string
  name: string
  message: string
  phone?: string
  email: string
  attachment?: FileList
  captcha?: string
  captchaVerified: boolean
}

export type NewsArticleType = {
  id: string
  title: string
  content?: any
  slug: string
  date: string
  img: ImageType
}

export type PlatformLinkType = {
  type:
    | "appleMusic"
    | "vkMusic"
    | "youTubeMusic"
    | "yandexMusic"
    | "amazonMusic"
    | "mtsMusic"
    | "beelineMusic"
    | "huaweiMusic"
    | "iTunes"
    | "zvuk"
    | "spotify"
    | "ok"
    | "tikTok"
    | "deezer"
    | "soundCloud"
    | "beatport"
    | "tidal"
    | "triller"
    | "shazam"
  title: string
  status?: boolean
  link?: string
}

export type CreateOrUpdateReleaseFormType = {
  type: "single" | "album"
  name: string
  date: Date
  link: string
  user: string
  img: FileList
  artistName?: string
  platformLinks: PlatformLinkType[]
  video?: string
  vkPixel?: string
  facebookPixel?: string
}

export type UpdateProfileFormType = {
  name: string
  description?: string
  site?: string
  canBookPerformance: boolean
  vk?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  instagram?: string
  avatar?: FileList
}

export type SliderType = {
  id: string
  textMain: string
  img: ImageType
  link?: string
  description?: string
}
