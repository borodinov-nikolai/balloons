import styles from "pages/news/News.module.scss"
import NewsArticle from "pages/news/NewsBlock/NewsArticle"
import { NewsArticleType } from "types/general"
import { Button, Grid, Link } from "@mui/material"

function NewsBlock() {
  const newsArticles: NewsArticleType[] = []
  const newsArticlesCount = 0

  return !!newsArticles.length ? (
    <Grid className={`block ${styles.news}`}>
      <Grid className="content">
        <Grid className={styles.vinyl_record} />

        <Grid container className={styles.article_list}>
          {newsArticles.map((it: NewsArticleType) => {
            return <NewsArticle key={it.id} newsArticle={it} />
          })}

          {newsArticlesCount > 2 && (
            <Link
              href="/news"
              style={{ textDecoration: "none", margin: "0 auto" }}
            >
              <Button variant="outlined">Все новости</Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default NewsBlock
