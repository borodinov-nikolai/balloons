import { StaticImageData } from "next/image"
import { ImageType } from "./common"

export interface INews {
  id: number
  image?: StaticImageData
  title: string
  content: string
}
