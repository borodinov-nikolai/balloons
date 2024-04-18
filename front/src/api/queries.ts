import { ICategory } from "@/types/category";
import { $api } from "./axiosConfig";
import { INews, IOneNews } from "@/types/news";
import { IGallery } from "@/types/gallery";



export const getAllCategories = async ()=> {
    try {
        const {data}: {data: ICategory} = await $api.get('/categories?populate=*')
        return data
    } catch(e) {
        console.error(e)
    }
} 

export const getAllNews = async ()=> {
    try {
        const {data}: {data: INews} = await $api.get('/articles?populate=*')
        return data
    } catch(e) {
        console.error(e)
    }
}


export const getOneNews = async (id: string)=> {
    try {
        const {data}: {data: IOneNews} = await $api.get(`/articles/${id}?populate=*`)
        return data
    } catch(e) {
        console.error(e)
    }
}

export const getAllImages = async (category: string)=> {
    try {
        const {data}: {data: IGallery} = await $api.get(`/galleries?filters[category][slug]=${category}&populate=*`)
        return data
    } catch(e) {
        console.error(e)
    }
}