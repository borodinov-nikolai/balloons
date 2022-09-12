import React, { useEffect, useState } from "react"
import withStandardLayout from "hoc/withStandardLayout"
import styles from "pages/artist/Artist.module.scss"
import ArtistHeader from "pages/artist/[slug]/ArtistHeader"
import { Button, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import { UserType } from "types/auth"
import MyReleases from "components/MyReleases"
import { API } from "lib/api"
import Loader from "components/Loader"
import { ReleaseType } from "types/general"
import ReleaseItem from "pages/releases/ReleaseItem"

function ArtistPage() {
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState<UserType>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const router = useRouter()
  const { slug } = router.query

  const releaseItems = user?.releases?.map((it: ReleaseType) => (
    <ReleaseItem key={it.id} release={it} sx={{ margin: "0 .5rem" }} />
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
              <Typography variant="h2" style={{ marginBottom: "2rem" }}>
                {isCurrentUser ? "МОИ РЕЛИЗЫ" : "РЕЛИЗЫ"}
              </Typography>

              {isCurrentUser && (
                <Link href="/release/new">
                  <Button>СОЗДАТЬ НОВЫЙ</Button>
                </Link>
              )}
            </Grid>

            {isCurrentUser ? (
              <MyReleases releases={user?.releases} />
            ) : (
              <Grid container>
                {user?.releases?.length
                  ? releaseItems
                  : [
                      <Grid
                        key={1}
                        container
                        style={{ fontSize: "2rem", margin: "2rem 0" }}
                        justifyContent="center"
                      >
                        У артиста пока нет рилизов
                      </Grid>,
                    ]}
              </Grid>
            )}
          </Grid>
        </>
      )}
    </section>
  )
}

export default withStandardLayout(ArtistPage)
