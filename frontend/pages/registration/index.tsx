import { useEffect, useRef, useState } from "react"
import IMask from "imask"
import { Button, Checkbox, Link, TextField, Typography } from "@mui/material"
import CloseButton from "components/CloseBtn"
import styles from "pages/registration/Registration.module.scss"
import withFormPage from "hoc/withFormPage"
import { useAuth } from "context/AuthProvider"
import Captcha from "components/Captcha"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { signUpFormType } from "types/auth"

function Registration(props: any) {
  const { isCaptchaVerified, setCaptchaVerified } = props
  const { loading, isAuthenticated, signUp, error: authError } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormType>()
  const [userAgreement, toggleUserAgreement] = useState(false)
  const phoneInputRef = useRef()

  useEffect(() => {
    if (isAuthenticated && !loading) router.push("/artist/new")
  })

  useEffect(() => {
    if (phoneInputRef.current)
      IMask(phoneInputRef.current, { mask: "+{7} (000) 000-00-00" })
  })

  const submitHandler = (data: signUpFormType) => {
    if (isCaptchaVerified) signUp(data)
  }

  return (
    <form className={styles.formPage} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3">Зарегистрироваться</Typography>

      <TextField
        label="E-mail"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoFocus
        className={styles.formPage__input}
        {...register("email", {
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Неправильный адрес",
          },
        })}
      />

      <TextField
        placeholder="Телефон"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        type="tel"
        inputRef={phoneInputRef}
        className={styles.formPage__input}
        {...register("phone", { required: true })}
      />

      <TextField
        label="Пароль"
        error={!!errors.password}
        helperText={errors.password?.message}
        type="password"
        className={styles.formPage__input}
        {...register("password", {
          required: true,
          minLength: {
            value: 8,
            message: "Пароль должен содержать не менее 8 символов",
          },
        })}
      />
      <div className={styles.formPage__checkboxRow}>
        <Checkbox
          id="user-agreement"
          checked={userAgreement}
          onChange={() => {
            toggleUserAgreement(!userAgreement)
          }}
          name="user-agreement"
          required
        />

        <p className={styles.formPage__checkboxText}>
          <a href={"/docs/Terms-of-use.pdf"} className={styles.formPage__link}>
            Принимаю пользовательское соглашение
          </a>
        </p>
      </div>

      <Captcha setCaptchaVerified={setCaptchaVerified} />

      <p className={styles.formPage__text}>
        У меня есть аккаунт
        <Link href={"/login"} className={styles.formPage__enterLink}>
          Войти
        </Link>
      </p>

      <Button
        type="submit"
        disabled={!userAgreement || Object.keys(errors).length !== 0 || loading}
        fullWidth
      >
        {loading ? "Проверка данных..." : "ЗАРЕГИСТРИРОВАТЬСЯ"}
      </Button>

      {authError}

      <CloseButton />
    </form>
  )
}

export default withFormPage(Registration)
