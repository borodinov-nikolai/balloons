import { useEffect, useRef, useState } from "react"
import { useCheckCaptcha, useGetCaptchaImage } from "hooks/captcha.hooks"
import useDebounce from "hooks/debounce.hooks"
import useGlobal from "context"
import { FormHelperText, Grid, TextField } from "@mui/material"
import styles from "./Captcha.module.scss"

function Captcha() {
  const { setCaptchaVerified } = useGlobal()
  const [captchaInput, setCaptchaInput] = useState("")
  const debouncedCaptchaInput = useDebounce(captchaInput, 1500)
  const [error, updateError] = useState("")
  const captchaImgBlockRef = useRef<HTMLElement | null>()
  const sizeOptions = useRef({ width: 0, height: 0 })

  const {
    fetchCaptchaImg,
    captchaImg,
    loading: fetchImgLoading,
    error: fetchImgError,
  } = useGetCaptchaImage()

  const {
    checkCaptcha,
    isCaptchaVerified,
    loading: checkCaptchaLoading,
    error: errorCheckCaptcha,
  } = useCheckCaptcha()

  const reloadCaptcha = async () => {
    setCaptchaVerified(false)
    updateError("")
    await fetchCaptchaImg(sizeOptions.current.width, sizeOptions.current.height)
  }

  useEffect(() => {
    if (debouncedCaptchaInput.length > 0) {
      checkCaptcha(debouncedCaptchaInput)
      setCaptchaVerified(isCaptchaVerified)
    }
  }, [
    checkCaptcha,
    debouncedCaptchaInput,
    isCaptchaVerified,
    setCaptchaVerified,
  ])

  useEffect(() => {
    sizeOptions.current = {
      width: Math.floor(
        captchaImgBlockRef.current?.getBoundingClientRect().width || 0
      ),
      height: Math.floor(
        captchaImgBlockRef.current?.getBoundingClientRect().height || 0
      ),
    }

    fetchCaptchaImg(sizeOptions.current.width, sizeOptions.current.height)
  }, [fetchCaptchaImg])

  useEffect(() => {
    if (fetchImgError) updateError("Ошибка загрузки изображения")
    if (errorCheckCaptcha) updateError("Капча введена неправильно")
  }, [fetchImgError, errorCheckCaptcha]) // add errors

  useEffect(() => {
    if (
      !isCaptchaVerified &&
      debouncedCaptchaInput !== "" &&
      !checkCaptchaLoading
    ) {
      updateError("Капча введена неправильно")
    } else {
      updateError("")
    }
  }, [
    isCaptchaVerified,
    checkCaptchaLoading,
    setCaptchaVerified,
    debouncedCaptchaInput,
  ])

  return (
    <Grid container direction="column" className={styles.captcha}>
      <Grid container wrap="nowrap" alignItems="center">
        <TextField
          variant="outlined"
          onChange={(e) => setCaptchaInput(e.target.value.toLowerCase())}
          className={
            error
              ? `${styles.captcha__input} ${styles.captcha__input_err}`
              : isCaptchaVerified
              ? `${styles.captcha__input} ${styles.captcha__input_done}`
              : styles.captcha__input
          }
        />

        <button
          className={styles.captcha__img}
          disabled={fetchImgLoading || checkCaptchaLoading}
          onClick={reloadCaptcha}
          // @ts-ignore
          ref={captchaImgBlockRef}
        >
          {fetchImgLoading ? (
            <p>Загрузка изображения</p>
          ) : (
            <img src={captchaImg} alt="" />
          )}
        </button>

        <button
          className={
            fetchImgLoading || checkCaptchaLoading
              ? `${styles.captcha__refreshBtn} ${styles.loading}`
              : styles.captcha__refreshBtn
          }
          disabled={fetchImgLoading || checkCaptchaLoading}
          onClick={reloadCaptcha}
        />
      </Grid>

      <FormHelperText
        className={
          error
            ? `${styles.captcha__label} ${styles.captcha__label_error}`
            : styles.captcha__label
        }
      >
        {error
          ? error
          : checkCaptchaLoading
          ? "Проверка..."
          : isCaptchaVerified
          ? ""
          : ""}
      </FormHelperText>
    </Grid>
  )
}

export default Captcha
