import { StaticImageData } from "next/image"
import { ImageType } from "./common"

export interface INews {
  id: number
  image?: ImageType
  title: string
  content: string
}
