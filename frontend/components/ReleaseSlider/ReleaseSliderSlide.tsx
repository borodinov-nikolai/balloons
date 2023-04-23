import styles from "./ReleaseSlider.module.scss"
import Link from "next/link"
import { Button, Grid, Typography } from "@mui/material"
import { getMediaUrl } from "lib/media"
import { ImageType } from "types/general"

type ReleaseSlideProps = {
  img: ImageType
  textMain: string
  link?: string
  description?: string
}

const ReleaseSliderSlide = (props: ReleaseSlideProps) => {
  let { img, textMain, link, description } = props
  return (
    <div
      style={{ backgroundImage: `url(${getMediaUrl(img)})` }}
      className={`block ${styles.slide}`}
    >
      <div className={styles.slideContent}>
        <Typography className={styles.slideTitle}>{textMain}</Typography>

        <Grid container direction="column" className={styles.slideSubtitle}>
          {description && (
            <Grid style={{ marginBottom: "2rem" }}>{description}</Grid>
          )}

          {link && (
            <Link href={link}>
              <Button
                className={`${styles.slideButton} ${styles.slideButtonMain}`}
              >
                Релиз
              </Button>
            </Link>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default ReleaseSliderSlide
