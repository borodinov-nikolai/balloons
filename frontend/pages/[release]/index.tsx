import { Button, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import Loader from "components/Loader"
import styles from "./Release.module.scss"
import SocialLinks from "components/SocialLinks"
import Logo from "components/Logo"
import Image from "next/image"
import { ReleaseType } from "types/general"
import { useEffect, useState } from "react"
import { API } from "lib/api"
import { getMediaUrl } from "lib/media"
import ReleaseLinkIcon from "components/ReleaseLinkIcon"
import getUserSocialLinks from "lib/getUserSocialLinks"
import Link from "next/link"

function ReleasePage() {
  const router = useRouter()
  const { release: releaseLink } = router.query
  const [release, setRelease] = useState<ReleaseType>()
  const [loading, setLoading] = useState(false)
  // @ts-ignore
  const year = new Date(release?.date).getFullYear()
  const releaseType = release?.type === "single" ? "Сингл" : "Альбом"

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
          <Grid container direction="column" alignItems="center">
            <Grid
              className={`square_img_container ${styles.release_img_container}`}
            >
              {release?.img && (
                <Image
                  src={getMediaUrl(release?.img)}
                  alt=""
                  fill
                  className="square_img"
                />
              )}
            </Grid>

            <Grid className={styles.release_column}>
              <Grid container alignItems="center" direction="column">
                <Typography variant="h3">{release?.name}</Typography>
                <Link href={`/artist/${release?.user.slug}`}>
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
                  >
                    {release?.artistName || release?.user?.name}
                  </Typography>
                </Link>

                <Typography variant="h6">{`${year} ${releaseType}`}</Typography>
              </Grid>

              {release?.video && (
                <Grid className={styles.release_column_video}>
                  <iframe
                    width="100%"
                    height="315"
                    src={release?.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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
                <SocialLinks
                  color="darkGray"
                  links={getUserSocialLinks(release?.user)}
                  sx={{ justifyContent: "center" }}
                />
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
