import { IImage } from "./image"


export interface IOneNews {
  data: Data
  meta: object
}

export interface INews {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  title: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: IImage
}



export interface Children {
  text: string
  type: string
}


export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
