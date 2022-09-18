import { Grid, Pagination } from "@mui/material"
import { ChangeEvent, ReactElement } from "react"
import { useRouter } from "next/router"

type ListProps = {
  children?: ReactElement[]
  pageSize?: number
  pageCount?: number
}

function List(props: ListProps) {
  const { children, pageCount, pageSize } = props
  const emptyItems =
    children?.length && pageSize
      ? Array.from(
          {
            length:
              children?.length > 3
                ? pageSize % children?.length
                : 4 - children?.length,
          },
          (_, i) => i
        )
      : []

  const router = useRouter()
  const page = Number(router.query.page) || 1

  const paginationHandler = (_: ChangeEvent<unknown>, value: number) => {
    router.push({
      pathname: router.pathname,
      query: { page: value },
    })
  }

  return (
    <Grid container justifyContent="space-between" style={{ height: "100%" }}>
      <>
        {children}

        {emptyItems.map((it) => (
          <Grid key={it} item style={{ width: "24%" }} />
        ))}

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
      </>
    </Grid>
  )
}

export default List
