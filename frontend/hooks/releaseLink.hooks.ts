import { useCallback, useEffect, useState } from "react"
import { API } from "lib/api"

function useReleaseLink() {
  const [loading, setLoading] = useState(false)
  const [uniqueLink, setUniqueLink] = useState("")
  const [isUniqueLink, setIsUniqueLink] = useState(true)
  const [error, setError] = useState("")

  const fetchUniqueLink = useCallback(async () => {
    setLoading(true)
    try {
      const {
        data: { data },
      } = await API.get("/release-link")
      console.log("release-link", data)
      setError("")
      setUniqueLink(data)
    } catch (e) {
      setError("Что-то пошло не так, перезагрузите страницу")
    }

    setLoading(false)
  }, [])

  const checkUniqueLink = useCallback(async (link: string) => {
    setLoading(true)
    try {
      const {
        data: { data },
      } = await API.get(`/release-link-is-unique/${link}`)
      setError("")
      setIsUniqueLink(data)
    } catch (e) {
      setError("Что-то пошло не так, перезагрузите страницу")
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchUniqueLink()
  }, [fetchUniqueLink])

  const checkUniqueReleaseLink = useCallback(async (link: string) => {
    setLoading(true)
    try {
      const { data } = await API.get("/release-link", {
        params: { link },
      })
      setError("")
      setLoading(false)
      return true
    } catch (e) {
      setError("Что-то пошло не так, перезагрузите страницу")
      setLoading(false)
      return false
    }
  }, [])

  return {
    uniqueLink,
    isUniqueLink,
    fetchUniqueLink,
    checkUniqueLink,
    checkUniqueReleaseLink,
    loading,
    error,
  }
}

export default useReleaseLink
