import withStandardLayout from "hoc/withStandardLayout"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { API } from "lib/api"

function Terms() {
  const [loading, setLoading] = useState(false)
  const [terms, setTerms] = useState()
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await API.get("/articles", {
          params: {
            "filters[slug][$eq]": "terms",
            _publicationState: "preview",
          },
        })
        console.log("data", data)
        setTerms(data[0])
        setError("")
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Grid container direction="column" flexGrow={1}>
      <Grid className="content" style={{ flexGrow: 1, padding: "4rem 1rem" }}>
        {!loading ? ( // @ts-ignore
          terms?.content
        ) : (
          <div>Идет загрузка</div>
        )}
      </Grid>
    </Grid>
  )
}

export default withStandardLayout(Terms)
