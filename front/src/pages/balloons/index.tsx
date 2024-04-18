import { getAllCategories, getAllImages } from "@/api/queries";
import RootLayout from "@/components/layouts/Layout";
import Portfolio from "@/components/sections/PortfolioPage/Portfolio/Portfolio";
import { ICategory } from "@/types/category";
import { IGallery } from "@/types/gallery";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categories = await getAllCategories()
  const gallery = await getAllImages(ctx.query.category as string)
  return { props: {categories: categories ? categories : null, gallery: gallery ? gallery : null} } 
}

export default function PortfolioPage({categories, gallery}: {categories: ICategory, gallery: IGallery}) {
  return (
    <RootLayout>
      <Portfolio gallery={gallery} categories={categories} />
    </RootLayout>
  )
}
