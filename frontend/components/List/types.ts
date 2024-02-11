import { ImageType } from "types/general"
import { CSSProperties } from "react"
import { UserType } from "types/auth"

export type ListItemType = {
  img?: ImageType
  title?: string
  link?: string
  subTitle?: string
  description?: string
  placeholder?: string
  style?: CSSProperties
  user?: UserType
}
