import withStandardLayout from "hoc/withStandardLayout"
import { Grid } from "@mui/material"
import SearchRow from "components/SearchRow"
import { useRouter } from "next/router"
import List from "components/List"
import NewsArticle from "pages/news/NewsBlock/NewsArticle"
import { NewsArticleType } from "types/general"

function News() {
  const limit = 8
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const searchQuery = router.query.search || ""
  const offset = page * limit - limit

  // @ts-ignore
  const loading = false
  const news: NewsArticleType[] = []

  const pageCount = Math.floor(10 + limit - 1) || 0

  const newsItems = loading ? (
    <div>Идет загрузка</div>
  ) : (
    news.map((it: NewsArticleType) => (
      <NewsArticle key={it.id} newsArticle={it} small />
    ))
  )

  // useEffect(() => {
  //   if (!searchQuery) refetch()
  // }, [refetch, searchQuery])

  return (
    <Grid container direction="column" flexGrow={1}>
      <SearchRow
        title="Новости"
        bg="linear-gradient(90deg, #FF3B3B -15.88%, #FFCD1C 133.05%)"
      />

      <Grid className="content" style={{ flexGrow: 1, padding: "4rem 1rem" }}>
        {/* @ts-ignore*/}
        <List count={Math.trunc(pageCount / limit)} pageSize={limit}>
          {news.length ? (
            newsItems
          ) : (
            <Grid
              container
              style={{ fontSize: "2rem", margin: "2rem 0" }}
              justifyContent="center"
            >
              Артистов с именем {searchQuery} не найдено
            </Grid>
          )}
        </List>
      </Grid>
    </Grid>
  )
}

export default withStandardLayout(News)
