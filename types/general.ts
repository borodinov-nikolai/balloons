export type ImageType = {
  url: string
  extension: string
}

export type ReleaseType = {
  id: string
  type: "single" | "album"
  name: string
  artistName?: string
  date: number
  vk?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  instagram?: string
  vkPixel?: string
  facebookPixel?: string
  link: string
  img: ImageType
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

export type MessageFormType = {
  messageTheme: string
  name: string
  message: string
  phone: string
  email: string
  file: FileList | File | null
}

export type NewsArticleType = {
  id: string
  title: string
  content?: any
  slug: string
  date: string
  img: ImageType
}

export type CreateReleaseFormType = {
  type: "single" | "album"
  name: string
  date: Date
  link: string
  img: FileList
  artistName?: string
  vk?: string
  vkPixel?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  facebookPixel?: string
  instagram?: string
  user?: object
}

export type CreateProfileFormType = {
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

export type UpdateProfileFormType = {
  name?: string
  description?: string
  site?: string
  canBookPerformance?: boolean
  vk?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  instagram?: string
  avatar?: FileList
}

export type MediaType = {
  data: { attributes: { url: string } }
}
