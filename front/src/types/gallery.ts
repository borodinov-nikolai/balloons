import { IImage, IImages } from "./image"

export interface IGallery {
    data: Data[]
    meta: Meta
  }
  
  export interface Data {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    createdAt: string
    updatedAt: string
    publishedAt: string
    Images: IImages
    category: Category
  }
  
  
  
  export interface Category {
    data: Data1
  }
  
  export interface Data1 {
    id: number
    attributes: Attributes3
  }
  
  export interface Attributes3 {
    name: string
    slug: string
    createdAt: string
    updatedAt: string
    publishedAt: string
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
  