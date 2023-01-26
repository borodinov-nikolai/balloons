import withStandardLayout from "hoc/withStandardLayout"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { API } from "lib/api"
import ReactMarkdown from "react-markdown"

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
            filters: { slug: { $eq: "terms" } },
            publicationState: "preview",
          },
        })
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
    <Grid
      container
      direction="column"
      flexGrow={1}
      className="privacyPolicyAndTerms"
    >
      <Grid className="content" style={{ flexGrow: 1, padding: "4rem 1rem" }}>
        {!loading ? ( // @ts-ignore
          // eslint-disable-next-line react/no-children-prop
          <ReactMarkdown children={terms?.content} />
        ) : (
          <div>Идет загрузка</div>
        )}
      </Grid>
    </Grid>
  )
}

export default withStandardLayout(Terms)
