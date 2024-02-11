import Image from "next/image"
import React, { useEffect, useState } from "react"
import withStandardLayout from "hoc/withStandardLayout"
import styles from "./Article.module.scss"
import { useRouter } from "next/router"
import { API } from "lib/api"
import Loader from "components/Loader"
import { ArticleType } from "types/general"
import { getMediaUrl } from "lib/media"
import { formatDate2 } from "utils/formatDate"
import Markdown from "react-markdown"

function ArticlePage() {
  const [article, setArticle] = useState<ArticleType>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    async function loadArticle() {
      setLoading(true)

      if (!article && slug && !error) {
        try {
          const {
            data: { data },
          } = await API.get(`/articles/${slug}`, {
            params: {
              populate: "*",
            },
          })

          if (data.length === 0) setError("Статья пуста")
          setArticle(data)
        } catch (e: any) {
          setError(e.message)
          setArticle(undefined)
        }
      }

      setLoading(false)
    }

    loadArticle()
  }, [error, slug, article])

  type ImagePropsType = {
    alt: string
    src: string
  }

  const CustomImage = ({ alt, src }: ImagePropsType) => {
    const baseURL = process.env.NEXT_PUBLIC_URL
    const absoluteSrc = `${baseURL || "https://linkmusic.ru"}${src}`

    return <img alt={alt} src={absoluteSrc} />
  }

  return loading ? (
    <Loader />
  ) : (
    <section className="block">
      <div className={`content ${styles.article}`}>
        {error ? (
          "Статья не найдена"
        ) : (
          <div className={styles.article__inner}>
            {article?.img?.url && (
              <Image
                src={getMediaUrl(article.img)}
                fill
                alt="Изображение новости"
                className={styles.article__image}
              />
            )}
            <h1 className={styles.article__title}>{article?.title}</h1>
            <span className={styles.article__date}>
              {formatDate2(article?.date || article?.createdAt)}
            </span>
            <div className={styles.article__content}>
              {/* @ts-ignore */}
              <Markdown components={{ img: CustomImage }}>
                {article?.content}
              </Markdown>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default withStandardLayout(ArticlePage)
