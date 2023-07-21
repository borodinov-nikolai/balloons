import { Button, Collapse, Grid, Typography } from "@mui/material"
import { ReleaseType } from "types/general"
import React, { useEffect, useState } from "react"
import styles from "./MyReleases.module.scss"
import Image from "next/image"
import { getMediaUrl } from "lib/media"
import Link from "next/link"

type MyReleasesProps = {
  releases?: ReleaseType[]
}

function MyReleases({ releases }: MyReleasesProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [linkCopied, setLinkCopied] = useState<boolean>(false)
  const toggleHandler = (id: string) => {
    if (openId === id) {
      setOpenId(null)
      return
    }

    setOpenId(id)
  }
  useEffect(() => {
    setTimeout(() => {
      setLinkCopied(false)
    }, 1000)
  }, [linkCopied])

  return (
    <Grid container direction="column" className={styles.wrapper}>
      {!!releases?.length ? (
        releases.map((realese, index) => (
          <Collapse
            collapsedSize="3.5rem"
            key={realese.id}
            in={openId === realese.id}
            onClick={() => toggleHandler(realese.id)}
          >
            <Grid container direction="column">
              <Grid container alignItems="center" className={styles.row}>
                <Typography style={{ fontWeight: 600, marginRight: ".5rem" }}>
                  {index + 1}
                </Typography>
                {realese.name}
              </Grid>
              <Grid
                container
                spacing={2}
                className={styles.content}
                alignItems="center"
              >
                <Grid item xs={12} sm={4}>
                  <Image
                    src={getMediaUrl(realese.img)}
                    alt="realese img"
                    width={200}
                    height={200}
                    className={styles.img}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Link href={`/release/statistics/${realese.link}`}>
                    <Button fullWidth className={styles.blue}>
                      Сводка по релизу
                    </Button>
                  </Link>

                  <a href={`/${realese.link}`} target="_blank" rel="noreferrer">
                    <Button fullWidth className={styles.red}>
                      Предпросмотр
                    </Button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    className={linkCopied ? styles.green : styles.purple}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      navigator.clipboard.writeText(
                        `https://linkmusic.ru/${realese.link}`
                      )
                      setLinkCopied(true)
                    }}
                  >
                    {linkCopied ? "Скопировано" : "Копировать ссылку"}
                  </Button>

                  <Link href={`/release/edit/${realese.link}`}>
                    <Button fullWidth className={styles.orange}>
                      Редактировать
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        ))
      ) : (
        <Grid>У артиста пока нет рилизов</Grid>
      )}
    </Grid>
  )
}

export default MyReleases
