import {getAllNews } from "@/api/queries";
import RootLayout from "@/components/layouts/Layout";
import News from "@/components/sections/NewsPage/News/News";
import { INews } from "@/types/news";
import { GetServerSideProps } from "next";




export const getServerSideProps: GetServerSideProps = async () => {
  const news = await getAllNews()
  return {props: { news: news ? news : null}}
}

export default function NewsPage({news}:{news: INews}) {
  return (
    <RootLayout>
      <News news={news} />
    </RootLayout>
  )
}
