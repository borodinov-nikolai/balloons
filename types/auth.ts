import { ImageType, ReleaseType, SocialLinkType } from "./general"

export type Session = {
  data: {
    id: string
    isAdmin: boolean
  }
}

export type UserType = {
  id: string
  name?: string
  slug?: string
  phone?: string
  email: string
  isAdmin?: boolean
  description?: string
  canBookPerformance: boolean
  vk?: string
  odnoklassniki?: string
  youtube?: string
  rutube?: string
  telegram?: string
  facebook?: string
  instagram?: string
  site?: string
  avatar?: ImageType
  releases?: ReleaseType[]
  socialLinks?: SocialLinkType[]
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: UserType | null
  loading: boolean
  error: string
  login: Function
  logout: Function
  signUp: Function
  createProfile: Function
  updateProfile: Function
}

export type loginFormType = {
  identifier: string
  password: string
}

export type signUpFormType = {
  email: string
  password: string
  phone: string
}
