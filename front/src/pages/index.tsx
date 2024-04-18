import React from "react";
import { getAllCategories } from "@/api/queries";
import RootLayout from "@/components/layouts/Layout";
import Categories from "@/components/sections/MainPage/Categories/Categories";
import Hero from "@/components/sections/MainPage/Hero/Hero";
import { ICategory } from "@/types/category";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await getAllCategories()
   
      return { props: {categories: categories? categories: null } }
    

}

export default function Home({categories}:{categories: ICategory | undefined}) {

  return (
    <RootLayout>
      <Hero />
      <Categories categories={categories} />
    </RootLayout>
  )
}
