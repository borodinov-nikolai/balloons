import { API } from "lib/api"
import { useCallback, useState } from "react"
import getQueryStr from "lib/queryStr"

function useGetCaptchaImage() {
  const [captchaImg, setCaptchaImg] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCaptchaImg = useCallback(async (width: number, height: number) => {
    console.log("fetchCaptchaImg")
    setLoading(true)
    try {
      const { data } = await API.get(getQueryStr("/captcha", { width, height }))
      setCaptchaImg(data)
      setError("")
    } catch (e) {
      setError("Что-то пошло не так, перезагрузите страницу")
    }

    setLoading(false)
  }, [])

  return { fetchCaptchaImg, captchaImg, loading, error }
}

function useCheckCaptcha() {
  const [isCaptchaVerified, setCaptchaVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const checkCaptcha = useCallback(async (receivedCaptcha: string) => {
    console.log("checkCaptcha")
    setLoading(true)
    try {
      const { data } = await API.post("/captcha", { receivedCaptcha })
      console.log(data)
      setCaptchaVerified(!!data)
    } catch (e) {
      setError("Что-то пошло не так, перезагрузите страницу")
    }
    setLoading(false)
  }, [])

  return {
    checkCaptcha,
    isCaptchaVerified,
    loading,
    error,
  }
}

export { useGetCaptchaImage, useCheckCaptcha }