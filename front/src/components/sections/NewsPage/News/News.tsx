
import { INews } from "@/types/news"
import styles from "./News.module.scss"
import Image from "next/image"
import Link from "next/link"
import { news } from "@/data/news/news"


export default function News() {
  return (
    <div className={styles.News}>
      <div className="container">
        <div className={styles.Inner}>
          {news.map((item: INews) => {
            return (
              <Link
                href={`/news/${item.id}`}
                className={styles.NewsItem}
                key={item.id}
              >
                {item.image && (
                  <Image
                    className={styles.NewsImage}
                    src={item.image}
                    alt={item.title}
                    width={0}
                    height={0}
                  />
                )}
                <h4 className={styles.NewsTitle}>{item.title}</h4>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
