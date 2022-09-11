import { ImageType, ReleaseType } from "./general"

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
  phone: string
  email: string
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
}

export type AuthContextType = {
  isAuthenticated: boolean
  user?: UserType
  loading: boolean
  error: string
  login: Function
  logout: Function
  signUp: Function
  updateProfile: Function
}

export type loginFormType = {
  identifier: string
  password: string
  captcha: string
}

export type signUpFormType = {
  email: string
  password: string
  phone: string
  captcha: string
}
