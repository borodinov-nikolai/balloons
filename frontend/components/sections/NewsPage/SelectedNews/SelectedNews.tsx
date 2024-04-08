import { news } from "data/news/news"
import Image from "next/image"
import styles from "./SelectedNews.module.scss"

export default function SelectedNews({ selectedId }: { selectedId: string }) {
  const selectedNews = news.find((item) => item.id === +selectedId)

  if (!selectedNews) {
    return <span>Новость не найдена</span>
  }

  return (
    <div className={styles.SelectedNews}>
      <div className="container">
        <div className={styles.Inner}>
          {selectedNews.image && (
            <Image
              src={selectedNews.image}
              alt={selectedNews.title}
              width={0}
              height={0}
              className={styles.Image}
            />
          )}
          <h2 className={styles.Title}>{selectedNews.title}</h2>
          <p className={styles.Content}>{selectedNews.content}</p>
        </div>
      </div>
    </div>
  )
}
