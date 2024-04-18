import { IImage } from "./image"

export interface ICategory {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: IImage
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