import { Button, Collapse, Grid, Typography } from "@mui/material"
import { ReleaseType } from "types/general"
import React, { useState } from "react"
import styles from "./MyReleases.module.scss"
import Image from "next/image"
import { getMediaUrl } from "lib/media"
import Link from "next/link"

type MyReleasesProps = {
  releases?: ReleaseType[]
}

function MyReleases({ releases }: MyReleasesProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggleHandler = (id: string) => {
    if (openId === id) {
      setOpenId(null)
      return
    }

    setOpenId(id)
  }

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
                    width={250}
                    height={250}
                    className={styles.img}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button fullWidth className={styles.blue}>
                    Сводка по релизу
                  </Button>

                  <a href={`/${realese.link}`} target="_blank" rel="noreferrer">
                    <Button fullWidth className={styles.red}>
                      Предпросмотр
                    </Button>
                  </a>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button fullWidth className={styles.purple}>
                    Копировать ссылку
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
