import { useEffect, useRef, useState } from "react"
import IMask from "imask"
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import CloseButton from "components/CloseBtn"
import styles from "pages/registration/Registration.module.scss"
import withFormPage from "hoc/withFormPage"
import { useAuth } from "context/AuthProvider"
import Captcha from "components/Captcha"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { signUpFormType } from "types/auth"

function Registration() {
  const { loading, isAuthenticated, signUp, error: authError } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<signUpFormType>()
  const [userAgreement, toggleUserAgreement] = useState(false)
  const [privacyPolicy, togglePrivacyPolicy] = useState(false)
  const phoneInputRef = useRef()

  useEffect(() => {
    if (isAuthenticated && !loading) router.push("/artist/new")
  })

  useEffect(() => {
    if (phoneInputRef.current)
      IMask(phoneInputRef.current, { mask: "+{7} (000) 000-00-00" })
  })

  const submitHandler = (data: signUpFormType) => {
    signUp(data)
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
        label="Телефон"
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
          checked={privacyPolicy}
          onChange={() => {
            togglePrivacyPolicy(!privacyPolicy)
          }}
          name="user-agreement"
          required
        />
        <div className={styles.formPage__checkboxText}>
          Принимаю
          <a href={"/terms"} className={styles.formPage__link}>
            «Пользовательское соглашение»
          </a>
        </div>
      </div>
      <div style={{ marginTop: 0 }} className={styles.formPage__checkboxRow}>
        <Checkbox
          id="privacy-policy"
          checked={userAgreement}
          onChange={() => {
            toggleUserAgreement(!userAgreement)
          }}
          name="privacy-policy"
          required
        />
        <div className={styles.formPage__checkboxText}>
          Принимаю
          <a href={"/privacy-policy"} className={styles.formPage__link}>
            «Политику конфиденциальности»
          </a>
        </div>
      </div>

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
        У меня есть аккаунт
        <Link
          sx={{ ml: "4px" }}
          href={"/login"}
          className={styles.formPage__enterLink}
        >
          Войти
        </Link>
      </div>

      <Button
        type="submit"
        disabled={
          !userAgreement ||
          Object.keys(errors).length !== 0 ||
          loading ||
          !privacyPolicy
        }
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
