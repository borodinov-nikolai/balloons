"use client"
import { getAllNews } from "api/news"
import styles from "./News.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { INews } from "types/news"

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllNews({
          url: `/api/news?populate=*`,
        })

        setNews(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.News}>
      <div className="container">
        <div className={styles.Inner}>
          {news
            ?.sort((a: any, b: any) => {
              const publishedAtA = new Date(a.publishedAt)
              const publishedAtB = new Date(b.publishedAt)
              //@ts-ignore
              return publishedAtB - publishedAtA
            })
            .map((news: INews) => {
              return (
                <Link
                  href={`/news/${news.id}`}
                  className={styles.NewsItem}
                  key={news.id}
                >
                  {news.image && (
                    <Image
                      className={styles.NewsImage}
                      //@ts-ignore
                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${news.image.url}`}
                      alt={news.title}
                      width={300}
                      height={300}
                    />
                  )}
                  <h4 className={styles.NewsTitle}>{news.title}</h4>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
