import React, { ChangeEvent, useState } from "react"
import Image from "next/image"
import left from "assets/search-row_vector-left.svg"
import right from "assets/search-row_vector-right.svg"
import styles from "./SearchRow.module.scss"
import { useRouter } from "next/router"
import { Typography } from "@mui/material"
import useDebounce from "hooks/debounce.hooks"

type SearchRowProps = {
  title: string
  bg: string
}

function SearchRow(props: SearchRowProps) {
  const { title, bg } = props
  const router = useRouter()
  const searchQuery = String(router.query?.search) || ""
  const [searchInput, setSearchInput] = useState<string>("")
  const debouncedSearchInput = useDebounce(searchInput, 1500)

  const onChangeHandler = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    router.push(
      {
        pathname: router.pathname,
        query: { search: e.target.value },
      },
      undefined,
      { shallow: true }
    )
    // setSearchInput(e.target.value)
  }

  // useEffect(() => {
  //   if (debouncedSearchInput)
  //     router.push(
  //       {
  //         pathname: router.pathname,
  //         query: { search: debouncedSearchInput },
  //       },
  //       undefined,
  //       { shallow: false }
  //     )
  // }, [debouncedSearchInput, router])

  // useEffect(() => {
  //   if (router.query.search) setSearchInput(searchQuery)
  // }, [])

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
              value={searchInput}
            />
            <div className={styles.searchRow__rightBg}>
              <div className={styles.searchRow__inputImg} />
            </div>
          </div>
          <div
            className={`${styles.searchRow__vector} ${styles.searchRow__vector_left}`}
          >
            <Image src={left} alt="" height={43} width={43} />
          </div>
          <div
            className={`${styles.searchRow__vector} ${styles.searchRow__vector_right}`}
          >
            <Image src={right} alt="" height={43} width={43} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchRow
