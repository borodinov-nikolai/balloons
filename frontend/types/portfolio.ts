import { StaticImageData } from "next/image"
import { ImageType } from "./common"

export interface IWork {
  id: number
  image: StaticImageData
  category: string
}
