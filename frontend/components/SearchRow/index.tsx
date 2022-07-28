import React, { ChangeEvent } from "react"
import Image from "next/image"
import left from "assets/search-row_vector-left.svg"
import right from "assets/search-row_vector-right.svg"
import styles from "./SearchRow.module.scss"
import { useRouter } from "next/router"
import { Typography } from "@mui/material"

type SearchRowProps = {
  title: string
  bg: string
}

function SearchRow(props: SearchRowProps) {
  const { title, bg } = props
  const router = useRouter()

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    router.push({
      pathname: router.pathname,
      query: {
        search: e.target.value,
        page: 1,
      },
    })
  }

  return (
    <section className="block_first-on-page">
      <div className="content content_full-screen">
        <div className={styles.searchRow__wrapper} style={{ background: bg }}>
          <Typography variant="h2" className={styles.searchRow__title}>
            {title}
          </Typography>

          <div className={styles.searchRow}>
            <input
              type="text"
              className={styles.searchRow__input}
              placeholder="Поиск"
              onChange={onChangeHandler}
            />
            <div className={styles.searchRow__rightBg}>
              <div className={styles.searchRow__inputImg} />
            </div>
          </div>
          <div
            className={`${styles.searchRow__vector} ${styles.searchRow__vector_left}`}
          >
            <Image src={left} alt="" />
          </div>
          <div
            className={`${styles.searchRow__vector} ${styles.searchRow__vector_right}`}
          >
            <Image src={right} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchRow
