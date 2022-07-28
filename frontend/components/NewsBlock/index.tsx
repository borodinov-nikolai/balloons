const NewsBlock = () => {
  // const { data } = useQuery(GET_NEWS_ARTICLES)
  // const newsArticles = data?.newsArticles || []
  // const newsArticlesCount = data?.newsArticlesCount
  // return !!newsArticles.length ? (
  //   <Grid className={`block ${styles.news}`}>
  //     <Grid className="content">
  //       <Grid className={styles.vinyl_record} />
  //
  //       <Grid container className={styles.article_list}>
  //         {newsArticles.map((it: NewsArticleType) => {
  //           return <NewsArticle key={it.id} newsArticle={it} />
  //         })}
  //
  //         {newsArticlesCount > 2 && (
  //           <Link
  //             href="/news"
  //             style={{ textDecoration: "none", margin: "0 auto" }}
  //           >
  //             <Button variant="outlined">Все новости</Button>
  //           </Link>
  //         )}
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // ) : null
}

export default NewsBlock
