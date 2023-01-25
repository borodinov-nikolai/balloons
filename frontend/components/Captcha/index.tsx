import { useEffect, useRef } from "react"
import { useCheckCaptcha, useGetCaptchaImage } from "hooks/captcha.hooks"
import useDebounce from "hooks/debounce.hooks"
import { FormHelperText, Grid, TextField } from "@mui/material"
import styles from "./Captcha.module.scss"

type CaptchaProps = {
  register: Function
  watch: Function
  setValue: Function
  setError: Function
  clearErrors: Function
  errors?: Record<string, any>
}

function Captcha({
  register,
  watch,
  setValue,
  setError,
  clearErrors,
  errors,
}: CaptchaProps) {
  const captchaValue = watch("captcha")
  const captchaVerified = watch("captchaVerified")
  const debouncedCaptchaInput = useDebounce(captchaValue, 500)
  const captchaImgBlockRef = useRef<HTMLDivElement | null>()
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
    setValue("captcha", "")
    setValue("captchaVerified", false)
    clearErrors("captcha")
    await fetchCaptchaImg(sizeOptions.current.width, sizeOptions.current.height)
  }

  useEffect(() => {
    if (debouncedCaptchaInput?.length > 0) {
      checkCaptcha(debouncedCaptchaInput)
      setValue("captchaVerified", isCaptchaVerified)

      if (!captchaVerified)
        setError("captcha", {
          type: "validated",
          message: "Капча введена неправильно",
        })
    }

    if (debouncedCaptchaInput?.length === 0 || isCaptchaVerified)
      clearErrors("captcha")
  }, [
    captchaVerified,
    checkCaptcha,
    clearErrors,
    debouncedCaptchaInput,
    isCaptchaVerified,
    setError,
    setValue,
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
    if (fetchImgError)
      setError("captcha", {
        type: "validated",
        message: "Ошибка загрузки изображения",
      })
    if (errorCheckCaptcha)
      setError("captcha", {
        type: "validated",
        message: "Ошибка сервера при проверки",
      })
  }, [errorCheckCaptcha, fetchImgError, setError])

  return (
    <Grid container style={{ position: "relative" }}>
      <Grid container className={styles.captcha}>
        <TextField
          className={styles.captcha__input}
          variant="outlined"
          error={!!errors?.captcha}
          {...register("captcha", {
            validate: {
              validated: (x: string) =>
                (!!x && !captchaVerified && "Капча введена неправильно") ||
                true,
              required: (x: string) => (!x && "Обязательное поле") || true,
            },
          })}
        />

        {/* @ts-ignore */}
        <Grid
          className={styles.captcha__img}
          onClick={reloadCaptcha}
          ref={captchaImgBlockRef}
        >
          <img src={captchaImg} alt="" />
          <span
            className={
              fetchImgLoading || checkCaptchaLoading
                ? `${styles.captcha__refreshBtn} ${styles.loading}`
                : styles.captcha__refreshBtn
            }
          />
        </Grid>
      </Grid>

      <FormHelperText
        className={errors?.captcha?.message ? styles.captcha__label_error : ""}
      >
        {errors?.captcha?.message || (checkCaptchaLoading && "Проверка...")}
      </FormHelperText>
    </Grid>
  )
}

export default Captcha
