"use client"
import Image from "next/image"
import styles from "./SelectedNews.module.scss"
import { useEffect, useState } from "react"
import { INews } from "types/news"
import { getNews } from "api/news"

export default function SelectedNews({ selectedId }: { selectedId: string }) {
  const [selectedNews, setSelectedNews] = useState<INews>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getNews({
          url: `/api/news/${String(selectedId)}?populate=*`,
        })

        setSelectedNews(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [selectedId])

  if (!selectedNews) {
    return <></>
  }

  return (
    <div className={styles.SelectedNews}>
      <div className="container">
        <div className={styles.Inner}>
          {selectedNews.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${selectedNews.image.url}`}
              alt={selectedNews.title}
              width={1920}
              height={400}
              className={styles.Image}
            />
          )}
          <h2 className={styles.Title}>{selectedNews.title}</h2>
          <div className={styles.Content}>{selectedNews.content}</div>
        </div>
      </div>
    </div>
  )
}
