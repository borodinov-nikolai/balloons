import React, { useEffect, useState } from "react"
import withStandardLayout from "hoc/withStandardLayout"
import styles from "pages/artist/Artist.module.scss"
import ArtistHeader from "pages/artist/[slug]/ArtistHeader"
import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import { UserType } from "types/auth"
import AddIcon from "@mui/icons-material/Add"
import MyReleases from "components/MyReleases"
import { API } from "lib/api"
import Loader from "components/Loader"
import { ReleaseType } from "types/general"
import ReleaseItem from "pages/releases/ReleaseItem"
import useWindowSize from "hooks/size.hooks"

function ArtistPage() {
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState<UserType>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const router = useRouter()
  const { slug } = router.query
  const size = useWindowSize()

  const releaseItems = user?.releases
    ?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    .map((it: ReleaseType) => (
      <ReleaseItem key={it.id} release={it} styles={{ margin: "0 .5rem" }} />
    ))

  useEffect(() => {
    async function loadUser() {
      setLoading(true)

      if (!user && slug && !error) {
        try {
          const {
            data: { data },
          } = await API.get("users", {
            params: {
              "filters[slug][$eq]": slug,
              populate: ["releases.img", "avatar"],
            },
          })

          if (data.length) await setUser(data[0])

          if (!data.length) setError("User not found")
        } catch (e: any) {
          setError(e.message)
          setUser(undefined)
        }
      }

      setLoading(false)
    }

    loadUser()
  }, [currentUser, error, slug, user])

  useEffect(() => {
    if (currentUser?.id && user?.id && user?.id === currentUser?.id)
      setIsCurrentUser(true)
  }, [currentUser?.id, user?.id])

  return loading ? (
    <Loader />
  ) : (
    <section className={`${styles.block_create} block block_first-on-page`}>
      {error ? (
        "Пользователь не найден"
      ) : (
        <>
          <ArtistHeader user={user} isCurrentUser={isCurrentUser} />

          <Grid className="content" style={{ marginTop: "12rem" }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h2">
                {isCurrentUser ? "МОИ РЕЛИЗЫ" : "РЕЛИЗЫ"}
              </Typography>

              {isCurrentUser && size.width > 400 ? (
                <Link href="/release/new">
                  <Button>СОЗДАТЬ НОВЫЙ</Button>
                </Link>
              ) : (
                <Link href="/release/new">
                  <IconButton sx={{ bgcolor: "#D4AA00", color: "white" }}>
                    <AddIcon />
                  </IconButton>
                </Link>
              )}
            </Grid>

            {isCurrentUser ? (
              <MyReleases releases={user?.releases} />
            ) : (
              <Box sx={{ overflow: "scroll" }}>
                <Grid
                  container
                  sx={{
                    flexWrap:
                      size.width < 1024 && size.width > 400 ? "nowrap" : "wrap",
                    width:
                      size.width > 400 && size.width < 1024 ? "200%" : "100%",
                  }}
                >
                  {user?.releases?.length
                    ? releaseItems
                    : [
                        <Grid
                          key={1}
                          container
                          style={{ fontSize: "1rem", margin: "1rem 0" }}
                          justifyContent="center"
                        >
                          У артиста пока нет рилизов
                        </Grid>,
                      ]}
                </Grid>
              </Box>
            )}
          </Grid>
        </>
      )}
    </section>
  )
}

export default withStandardLayout(ArtistPage)
