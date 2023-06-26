import React, { ChangeEvent } from "react"
import Image from "next/image"
import left from "assets/search-row_vector-left.svg"
import right from "assets/search-row_vector-right.svg"
import styles from "./SearchRow.module.scss"
import { Typography } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import useWindowSize from "hooks/size.hooks"
import right_mobile from 'assets/right-mobile-search.png'

type SearchRowProps = {
  title: string
  bg: string
}

function SearchRow(props: SearchRowProps) {
  const { title, bg } = props
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    router.push(`${pathname}?search=${e.target.value}`)
  }
  const size = useWindowSize()

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
              defaultValue={searchQuery}
            />
            <div className={styles.searchRow__rightBg}>
              <div className={styles.searchRow__inputImg} />
            </div>
          </div>
          <div
             className={`${styles.searchRow__vector} ${styles.searchRow__vector_left}`} 
          >
            <Image src={left} alt=""  />
          </div>
          <div
            className={`${styles.searchRow__vector} ${styles.searchRow__vector_right}`}
          >
            {size.width > 767 ? <Image src={right} alt=""  /> : <Image style={{position: 'absolute', top: '130px', right: '230px'}} src={right_mobile} alt="" />}
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchRow
