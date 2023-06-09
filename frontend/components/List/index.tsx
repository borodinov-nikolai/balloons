import { Grid, Pagination } from "@mui/material"
import { ChangeEvent, ReactElement } from "react"
import { useRouter } from "next/router"
import styles from "./List.module.scss"
import { usePathname, useSearchParams } from "next/navigation"

type ListProps = {
  children?: ReactElement[]
  pageCount?: number
}

function List(props: ListProps) {
  const { children, pageCount } = props
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(router.query.page) || 1

  const paginationHandler = (_: ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(value))
    router.push(`${pathname}?${params}`)
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
