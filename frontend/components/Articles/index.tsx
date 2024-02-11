import Image from "next/image"
import styles from "./Articles.module.scss"
import { useEffect, useState } from "react"
import { API } from "lib/api"
import { ArticleType } from "types/general"
import Link from "next/link"
import { formatDate2 } from "utils/formatDate"
import { getMediaUrl } from "lib/media"

function Articles() {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/articles", {
          params: {
            populate: ["img"],
          },
        })

        setArticles(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchArticles()
  }, [])

  const visibleArticles = articles
    .filter((article) => article.isView === true)
    .sort((a, b) => +a.id - +b.id)

  return (
    articles &&
    articles.length !== 0 && (
      <div className="content">
        <h2 className={styles.title}>Новости</h2>
        <div className={styles.articles}>
          {visibleArticles.slice(0, 2).map((art: ArticleType) => (
            <article className={styles.article} key={art.id}>
              {art?.img?.url && (
                <Link href={`/article/${art.slug}`}>
                  <Image
                    src={
                      art.img?.url
                        ? getMediaUrl(art.img)
                        : "/assets/placeholder.png"
                    }
                    fill
                    alt="Изображение новости"
                    className={styles.article__image}
                  />
                </Link>
              )}
              <span className={styles.article__date}>
                {formatDate2(art.date || art.createdAt)}
              </span>
              <Link href={`/article/${art.slug}`}>{art.title}</Link>
            </article>
          ))}
        </div>
      </div>
    )
  )
}

export default Articles
