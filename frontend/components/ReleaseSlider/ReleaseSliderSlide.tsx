import styles from "./ReleaseSlider.module.scss"
import Link from "next/link"
import { Button, Grid, Typography } from "@mui/material"
import { getMediaUrl } from "lib/media"
import { ImageType } from "types/general"
import useWindowSize from "hooks/size.hooks"

type ReleaseSlideProps = {
  img: ImageType
  imgTablet?: ImageType
  imgMobile?: ImageType
  textMain: string
  link?: string
  description?: string
  buttonText?: string
}

const ReleaseSliderSlide = (props: ReleaseSlideProps) => {
  let { img, textMain, link, description, buttonText, imgTablet, imgMobile } =
    props

  const size = useWindowSize()

  return (
    <div
      style={{
        backgroundImage:
          // @ts-ignore
          size.width < 376 && imgMobile?.data !== null
            ? `url(${getMediaUrl(imgMobile)})`
            : // @ts-ignore
              size.width < 769 && imgTablet?.data !== null
              ? `url(${getMediaUrl(imgTablet)})`
              : `url(${getMediaUrl(img)})`,
      }}
      className={`block ${styles.slide}`}
    >
      <div className={`${styles.slideContent} ${styles.slideContentCustom}`}>
        <Typography
          className={`${styles.slideTitle} ${styles.slideTitleCustom}`}
        >
          {textMain}
        </Typography>

        <Grid
          container
          direction="column"
          className={`${styles.slideSubtitle} ${styles.slideSubtitleCustom}`}
        >
          {description && (
            <Grid className={styles.slideDescription}>{description}</Grid>
          )}

          {link && (
            <a href={link} target="_blank">
              <Button
                sx={{ mt: "79px" }}
                className={`${styles.slideButton} ${styles.slideButtonMain} ${styles.slideButtonCustom}`}
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
