import Link from "next/link"
import withFormPage from "hoc/withFormPage"
import CloseButton from "components/CloseBtn"
import styles from "pages/registration/Registration.module.scss"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import { Button, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { loginFormType } from "types/auth"
import { FunctionComponent } from "react"

const Login: FunctionComponent = (props: any) => {
  const { isCaptchaVerified, setCaptchaVerified } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>()
  const { isAuthenticated, loading, login, error: authError } = useAuth()
  const router = useRouter()

  const submitHandler = (data: loginFormType) => {
    // if (isCaptchaVerified) login(data)
    login(data)
  }
  // useEffect(() => {
  //   if (isAuthenticated && !loading) router.push("/artist/new")
  // }, [isAuthenticated, loading, router])

  return (
    <form className={styles.formPage} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3">Войти</Typography>

      <TextField
        label="E-mail"
        // error={!!errors.email}
        // helperText={errors.email?.message}
        autoFocus
        className={styles.formPage__input}
        {...register("identifier", {
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Неправильный адрес",
          },
        })}
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

      <Link href={"/forgot-password"}>
        <a className={styles.forgotPassword}>Забыли пароль?</a>
      </Link>

      {/*<Captcha setCaptchaVerified={setCaptchaVerified} />*/}

      <p className={styles.formPage__text}>
        Нет аккаунта?
        <Link href={"/registration"}>
          <a className={styles.formPage__enterLink}>Зарегистрироваться</a>
        </Link>
      </p>

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Проверка данных..." : "Вход"}
      </Button>
      {authError}

      <CloseButton />
    </form>
  )
}

export default withFormPage(Login)
