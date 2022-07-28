import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { useCheckCaptcha, useGetCaptchaImage } from "hooks/captcha.hooks"
import useDebounce from "hooks/debounce.hooks"

import styles from "./Captcha.module.scss"

function Captcha(props: any) {
  const { setCaptchaVerified } = props

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
    error: errorCaptchaLoading,
  } = useCheckCaptcha()

  const reloadCaptcha = (e: SyntheticEvent) => {
    e.preventDefault()
    setCaptchaVerified(false)
    updateError("")
    fetchCaptchaImg(sizeOptions.current.width, sizeOptions.current.height)
  }

  useEffect(() => {
    if (debouncedCaptchaInput.length > 0) checkCaptcha(debouncedCaptchaInput)
  }, [checkCaptcha, debouncedCaptchaInput])

  useEffect(() => {
    setCaptchaVerified(false)
    sizeOptions.current = {
      width: Math.floor(
        captchaImgBlockRef.current?.getBoundingClientRect().width || 0
      ),
      height: Math.floor(
        captchaImgBlockRef.current?.getBoundingClientRect().height || 0
      ),
    }
    fetchCaptchaImg(sizeOptions.current.width, sizeOptions.current.height)
  }, [fetchCaptchaImg, setCaptchaVerified]) // set first-render captchaImg

  useEffect(() => {
    if (fetchImgError) updateError(fetchImgError)
    if (errorCaptchaLoading) updateError(errorCaptchaLoading)
  }, [fetchImgError, errorCaptchaLoading]) // add errors

  useEffect(() => {
    if (
      !isCaptchaVerified &&
      debouncedCaptchaInput !== "" &&
      !checkCaptchaLoading
    ) {
      updateError("Капча введена неправильно")
    }
  }, [
    isCaptchaVerified,
    checkCaptchaLoading,
    setCaptchaVerified,
    debouncedCaptchaInput,
  ])

  return (
    <div className={styles.captcha}>
      <label
        htmlFor=""
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
          : "Введите указанное слово"}
      </label>

      <div className={styles.captcha__row}>
        <input
          type="text"
          pattern="^[а-яА-ЯёЁ0-9]+$"
          onChange={(e) => {
            setCaptchaInput(e.target.value.toLowerCase())
          }}
          className={
            error
              ? `${styles.captcha__input} ${styles.captcha__input_err}`
              : isCaptchaVerified
              ? `${styles.captcha__input} ${styles.captcha__input_done}`
              : styles.captcha__input
          }
          required
        />

        <button
          type="button"
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
        {fetchImgLoading || checkCaptchaLoading}
        <button
          type="button"
          className={
            fetchImgLoading || checkCaptchaLoading
              ? `${styles.captcha__refreshBtn} ${styles.loading}`
              : styles.captcha__refreshBtn
          }
          disabled={fetchImgLoading || checkCaptchaLoading}
          onClick={reloadCaptcha}
        />
      </div>
    </div>
  )
}

export default Captcha
