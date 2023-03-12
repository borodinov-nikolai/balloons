import { Grid, Pagination } from "@mui/material"
import { ChangeEvent, ReactElement } from "react"
import { useRouter } from "next/router"
import styles from "./List.module.scss"

type ListProps = {
  children?: ReactElement[]
  pageCount?: number
}

function List(props: ListProps) {
  const { children, pageCount } = props

  const router = useRouter()
  const page = Number(router.query.page) || 1

  const paginationHandler = (_: ChangeEvent<unknown>, value: number) => {
    router.push({
      pathname: router.pathname,
      query: { page: value },
    })
  }

  return (
    <Grid container className={styles.list}>
      {children}

      <Grid container justifyContent="center" style={{ margin: "2rem 0" }}>
        {!!pageCount && pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            size="large"
            onChange={paginationHandler}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default List
