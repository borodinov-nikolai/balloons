import styles from "./ReleaseSlider.module.scss"
import { Button, Grid, Typography } from "@mui/material"
import { getMediaUrl } from "lib/media"
import { ImageType } from "types/general"
import useWindowSize from "hooks/size.hooks"

type ReleaseSlideProps = {
  img: ImageType
  imgLaptop?: ImageType
  imgTablet?: ImageType
  imgMobile?: ImageType
  textMain: string
  link?: string
  description?: string
  buttonText?: string
}

const ReleaseSliderSlide = (props: ReleaseSlideProps) => {
  let {
    img,
    textMain,
    link,
    description,
    buttonText,
    imgLaptop,
    imgTablet,
    imgMobile,
  } = props

  const size = useWindowSize()

  return (
    <div
      style={{
        backgroundImage:
          // @ts-ignore
          size.width < 376 && imgMobile?.data !== null
            ? `url(${getMediaUrl(imgMobile)})`
            : // @ts-ignore
              size.width < 768 && imgTablet?.data !== null
              ? `url(${getMediaUrl(imgTablet)})`
              : // @ts-ignore
                size.width < 1024 && imgLaptop?.data !== null
                ? `url(${getMediaUrl(imgLaptop)})`
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
