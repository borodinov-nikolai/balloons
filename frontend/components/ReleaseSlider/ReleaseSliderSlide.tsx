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
  buttonText?: string
}

const ReleaseSliderSlide = (props: ReleaseSlideProps) => {
  let { img, textMain, link, description, buttonText } = props
  return (
    <div
      style={{ backgroundImage: `url(${getMediaUrl(img)})` }}
      className={`block ${styles.slide}`}
    >
      <div className={styles.slideContent}>
        <Typography className={styles.slideTitle}>{textMain}</Typography>

        <Grid container direction="column" className={styles.slideSubtitle}>
          {description && (
            <Grid style={{ marginBottom: "3rem", marginTop: "3rem" }}>
              {description}
            </Grid>
          )}

          {link && (
            <a href={link} target="_blank">
              <Button
                sx={{ mt: "79px" }}
                className={`${styles.slideButton} ${styles.slideButtonMain}`}
              >
                {buttonText || "Релиз"}
              </Button>
            </a>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default ReleaseSliderSlide
