import withStandardLayout from "hoc/withStandardLayout"
import SearchRow from "components/SearchRow"
import List from "components/List"
import { UserType } from "types/auth"
import { useRouter } from "next/router"
import { Grid } from "@mui/material"
import ArtistItem from "pages/artists/ArtistItem"
import { useEffect, useState } from "react"
import { API } from "lib/api"

function Artists() {
  const limit = 8
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const searchQuery = router.query.search || ""
  const [artists, setArtists] = useState<UserType[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const offset = page * limit - limit

  // usersCount
  const pageCount = Math.floor(2 + limit - 1) || 0

  const artistItems = loading
    ? [<div key={1}>Идет загрузка</div>]
    : artists.map((it: UserType) => <ArtistItem key={it.id} artist={it} />)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/users", {
          params: {
            populate: { avatar: "*" },
            "filters[name][$null]": "",
            "filters[blocked]": "false",
            start: offset,
            limit,
            "sort[createdAt]": "desc",
          },
        })
        setArtists(data)
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchData()
  }, [offset, page])

  return (
    <>
      <SearchRow
        title="Артисты"
        bg="linear-gradient(90deg, #FF3B3B -15.88%, #FFCD1C 133.05%)"
      />

      <Grid className="content" style={{ flexGrow: 1, padding: "4rem 1rem" }}>
        <List pageCount={Math.trunc(pageCount / limit)} pageSize={limit}>
          {artists.length
            ? artistItems
            : [
                <Grid
                  key={1}
                  container
                  style={{ fontSize: "2rem", margin: "2rem 0" }}
                  justifyContent="center"
                >
                  Артистов с именем {searchQuery} не найдено
                </Grid>,
              ]}
        </List>
      </Grid>

      <div className="vector__bg vector__bg_10">
        <svg
          width="344"
          height="492"
          viewBox="0 0 344 492"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M281.76 39.9102C281.76 39.9102 187.906 40.9553 165.83 134.908C144.236 226.797 73.6413 208.465 44.1973 253.005C14.7534 297.545 33.1739 375.714 113.392 379.746C184.952 383.344 184.263 426.726 200.008 450.825C215.752 474.925 251.599 489.762 251.599 489.762"
            stroke="url(#paint0_linear_823:1272)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M250.752 402.197C250.752 402.197 182.283 344.933 121.389 342.114C60.4954 339.296 62.6531 294.8 73.145 279.082C94.9149 246.489 172.717 255.692 189.763 199.235C202.561 156.801 185.218 92.4864 258.73 75.7949"
            stroke="url(#paint1_linear_823:1272)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M246.125 355.688C246.125 355.688 152.989 346.644 172.729 306.448C195.331 260.387 224.251 267.242 209.735 199.874C204.532 175.938 220.221 87.0118 270.323 116.121"
            stroke="url(#paint2_linear_823:1272)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_823:1272"
              x1="217.585"
              y1="26.4282"
              x2="125.799"
              y2="463.334"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_823:1272"
              x1="218.24"
              y1="67.2887"
              x2="152.23"
              y2="381.499"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_823:1272"
              x1="255.297"
              y1="110.508"
              x2="205.359"
              y2="348.214"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default withStandardLayout(Artists)
