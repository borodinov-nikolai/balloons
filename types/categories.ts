import { StaticImageData } from "next/image"

export interface ICategory {
  id: number
  image?: StaticImageData
  name: string
  slug: string
}
