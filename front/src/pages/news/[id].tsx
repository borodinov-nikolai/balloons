import { getOneNews } from "@/api/queries"
import RootLayout from "@/components/layouts/Layout"
import SelectedNews from "@/components/sections/NewsPage/SelectedNews/SelectedNews"
import { IOneNews } from "@/types/news"
import { GetServerSideProps, NextPageContext } from "next"
import { useRouter } from "next/router"




export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const selectedNews = await getOneNews(ctx.params?.id as string)
  return { props: { selectedNews } }
}


export default function SelectedNewsPage({selectedNews}: {selectedNews: IOneNews}) {

  return (
    <RootLayout>
      <SelectedNews selectedNews={selectedNews}/>
    </RootLayout>
  )
}
