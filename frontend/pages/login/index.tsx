import Link from "next/link"
import withFormPage from "hoc/withFormPage"
import CloseButton from "components/CloseBtn"
import styles from "pages/registration/Registration.module.scss"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { loginFormType } from "types/auth"
import { FunctionComponent, useEffect } from "react"
import Captcha from "components/Captcha"

const Login: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<loginFormType>()
  const { user, loading, login, error: authError } = useAuth()
  const router = useRouter()

  const submitHandler = (data: loginFormType) => {
    login(data)
  }

  useEffect(() => {
    if (user?.name && !loading) router.push(`/artist/${user?.slug}`)
    if (user?.email && !loading) router.push("/artist/new")
  }, [loading, router, user?.email, user?.name, user?.slug])

  return (
    <form className={styles.formPage} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3">Войти</Typography>

      <TextField
        label="E-mail"
        error={!!errors.identifier}
        helperText={errors.identifier && "Обязательное поле"}
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
        helperText={errors.password && "Обязательное поле"}
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

      <Link href={"/forgot-password"} className={styles.forgotPassword}>
        Забыли пароль?
      </Link>

      <Grid container style={{ margin: "1rem 0 0" }}>
        <Captcha
          register={register}
          errors={errors}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          watch={watch}
        />
      </Grid>

      <div className={styles.formPage__text}>
        Нет аккаунта?{" "}
        <Link href={"/registration"} className={styles.formPage__enterLink}>
          Зарегистрироваться
        </Link>
      </div>

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Проверка данных..." : "Вход"}
      </Button>

      {authError}

      <CloseButton />
    </form>
  )
}

export default withFormPage(Login)
