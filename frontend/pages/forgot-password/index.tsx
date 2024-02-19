import Link from "next/link"
import withFormPage from "hoc/withFormPage"
import CloseButton from "components/CloseBtn"
import styles from "pages/registration/Registration.module.scss"
import { useAuth } from "context/AuthProvider"
import { useRouter } from "next/router"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { forgotPasswordType, loginFormType } from "types/auth"
import { FunctionComponent, useEffect } from "react"
import Captcha from "components/Captcha"

const ForgotPassword: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<forgotPasswordType>()
  const { loading, forgotPassword, error } = useAuth()

  const submitHandler = (data: forgotPasswordType) => {
    forgotPassword(data)
  }

  return (
    <form className={styles.formPage} onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h3">Восстановление пароля</Typography>

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
      <span>{error && error}</span>
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

      <Button type="submit" disabled={loading} fullWidth>
        {loading ? "Проверка данных..." : "Отправить"}
      </Button>

      <CloseButton />
    </form>
  )
}

export default withFormPage(ForgotPassword)
