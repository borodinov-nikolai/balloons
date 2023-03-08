import withStandardLayout from "hoc/withStandardLayout"
import { Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { NewsArticleType } from "types/general"
import Image from "next/image"
import { getMediaUrl } from "../../../lib/media"

function NewsPage() {
  const router = useRouter()
  const { slug } = router.query

  // @ts-ignore
  const newsArticle: NewsArticleType = {}

  return (
    <section className="block block-artist-card block_first-on-page">
      <Grid container direction="column" className="container">
        <Typography variant="h3">{newsArticle?.title}</Typography>
        {newsArticle?.img.url && (
          <Image
            src={getMediaUrl(newsArticle.img)}
            width={300}
            height={300}
            alt=""
          />
        )}
        {newsArticle?.content?.document && (
          <Typography>
            {/* @ts-ignore */}
            <DocumentRenderer document={newsArticle.content.document} />
          </Typography>
        )}
      </Grid>
    </section>
  )
}

export default withStandardLayout(NewsPage)
