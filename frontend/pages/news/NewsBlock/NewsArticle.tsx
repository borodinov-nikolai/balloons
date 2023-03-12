import styles from "pages/news/News.module.scss"
import { Grid } from "@mui/material"
import { NewsArticleType } from "types/general"

type NewsArticleProps = {
  newsArticle: NewsArticleType
  small?: boolean
}

function NewsArticle({ newsArticle, small = false }: NewsArticleProps) {
  const { title, slug, date, img } = newsArticle
  return (
    <Grid container className={styles.article}>
      <a
        href={`/news/${slug}`}
        className={styles.article_img_wrapper}
        style={{ backgroundImage: `url(${img?.url})` }}
      />
      <div className={styles.article_date}>
        {new Date(date).toLocaleDateString("ru-RU")}
      </div>

      <a href={`/news/${slug}`} className={styles.article_title}>
        {title}
      </a>
    </Grid>
  )
}

export default NewsArticle
