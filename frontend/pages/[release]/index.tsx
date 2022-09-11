import { Button, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import Loader from "components/Loader"
import styles from "./Release.module.scss"
import SocialLinks from "components/SocialLinks"
import Logo from "components/Logo"
import { useAuth } from "context/AuthProvider"
import Image from "next/image"
import { ReleaseType } from "types/general"
import { useEffect, useState } from "react"
import { API } from "lib/api"
import { getMediaUrl } from "lib/media"
import ReleaseLinkIcon from "components/ReleaseLinkIcon"
import getUserSocialLinks from "lib/getUserSocialLinks"

function ReleasePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { release: releaseLink } = router.query
  const [release, setRelease] = useState<ReleaseType | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await API.get("/releases", {
          params: {
            populate: "*",
            "filters[link][$eq]": releaseLink,
          },
        })
        if (data.length > 0) {
          setRelease(data[0])
        }
        // setError("")
      } catch (e) {
        // setError("Что-то пошло не так, перезагрузите страницу")
      }
    }

    fetchData()
    setLoading(false)
  }, [releaseLink])

  return loading ? (
    <Loader />
  ) : (
    <Grid className={styles.wrapper}>
      <section className={`block ${styles.block_release}`}>
        <Grid
          className={styles.block_release_bg_img}
          style={{
            backgroundImage: `url(${getMediaUrl(release?.img)})`,
          }}
        />
        <Grid className="content">
          <Grid className={styles.release_wrapper}>
            <Grid className={styles.release_column_img}>
              {release?.img && (
                <Image
                  src={getMediaUrl(release?.img)}
                  alt="list img"
                  width={280}
                  height={280}
                />
              )}
            </Grid>

            <Grid className={styles.release_column}>
              <Grid container alignItems="center" direction="column">
                <Typography variant="h2">{release?.name}</Typography>
                <Typography variant="h6">
                  {release?.artistName || user?.name}
                </Typography>
              </Grid>

              {release?.video && (
                <Grid className={styles.release_column_video}>
                  <Grid className={styles.catalog_videos_img}>
                    <img src="images/release__video-img.png" alt="" />
                    <Grid className="catalog-videos__youtube">
                      <img src="images/youtube.svg" alt="" />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid className={styles.release_column_tracks_list}>
                {release?.platformLinks?.map((it) => (
                  <Grid
                    key={it.type}
                    className={styles.release_column_track_row}
                  >
                    <Grid className={styles.release_column_track_item}>
                      <ReleaseLinkIcon
                        type={it.type}
                        size="standard"
                        style={{ marginRight: "1rem" }}
                      />

                      <div className={styles.release_column_track_name}>
                        {it.title}
                      </div>
                    </Grid>
                    <Button href={it.link}>Слушать</Button>
                  </Grid>
                ))}
              </Grid>

              <Grid style={{ padding: "2rem 0 1rem" }}>
                <SocialLinks links={getUserSocialLinks(release?.user)} />
              </Grid>
            </Grid>

            <Grid
              className={styles.release_logo}
              container
              justifyContent="center"
            >
              <Logo />
            </Grid>
          </Grid>
        </Grid>
      </section>
    </Grid>
  )
}

export default ReleasePage
