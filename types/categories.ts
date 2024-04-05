import { ImageType } from "./common"

export interface ICategory {
  id: number
  image?: ImageType
  name: string
  slug: string
}
