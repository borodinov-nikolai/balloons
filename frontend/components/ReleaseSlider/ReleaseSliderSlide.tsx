import styles from "./ReleaseSlider.module.scss"
import Link from "next/link"
import { Button, Grid, Typography } from "@mui/material"

const ReleaseSliderSlide = (props: any) => {
  let { bg } = props
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={`block ${styles.slide}`}
    >
      <div className={styles.slideContent}>
        <Typography className={styles.slideTitle}>
          Расскажи <br /> всем о релизе
        </Typography>
        <Grid container direction="column" className={styles.slideSubtitle}>
          <Grid style={{ marginBottom: "2rem" }}>
            Создай уникальную страницу своего <br /> музыкального релиза
          </Grid>
          <Link href="/release/new">
            <Button
              className={`${styles.slideButton} ${styles.slideButtonMain}`}
            >
              Создать релиз
            </Button>
          </Link>
        </Grid>
      </div>
    </div>
  )
}

export default ReleaseSliderSlide
