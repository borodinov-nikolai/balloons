import styles from "pages/artist/Artist.module.scss"
import withStandardLayout from "hoc/withStandardLayout"
import withPrivateRoute from "hoc/withPrivateRoute"
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import LoadImage from "components/FeedbackForm/LoadImage"
import Margin from "components/FeedbackForm/Margin"
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth } from "context/AuthProvider"
import { CreateReleaseFormType } from "types/general"
import { useRouter } from "next/router"
import useReleaseLink from "hooks/releaseLink.hooks"
import { SyntheticEvent, useEffect, useMemo } from "react"
import { API } from "lib/api"

function NewRelease() {
  const { uniqueLink, isUniqueLink } = useReleaseLink()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateReleaseFormType>({
    defaultValues: {
      date: new Date(),
      link: useMemo(() => uniqueLink, [uniqueLink]),
    },
  })

  const { user } = useAuth()
  const router = useRouter()

  const submitHandler = async (form: CreateReleaseFormType) => {
    console.log("submitHandler", form)
    try {
      const { data } = await API.put(
        "users/me",
        {
          ...form,
          avatar: form.avatar?.item(0),
        },
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )

      if (data) {
        setUser(data)
        await router.push(`/artist/${data.slug}`)
      }

      if (!data) setError("User not found")
    } catch (e: any) {
      setError(e.message)
      setUser(null)
    }
    // await router.push(`/artist/${user?.slug}`)
  }

  const onChangeLinkHandler = (ev: SyntheticEvent) => {
    console.log("value", ev.target.value)
  }

  useEffect(() => {
    setValue("link", uniqueLink)
  }, [setValue, uniqueLink])

  return (
    <>
      <section className="block block_first-on-page">
        <div className="vector__bg vector__bg_right-top">
          <img src={"/images/vector-bg_catalog-right.svg"} alt="" />
        </div>

        <div className="content">
          <Grid container justifyContent="center">
            <Typography variant="h2">НОВЫЙ РЕЛИЗ</Typography>
          </Grid>

          <div className={styles.create_main_row}>
            <LoadImage
              formFieldName="img"
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              required
            />
            <Margin />

            <div className={styles.right_column}>
              <form
                className={styles.create_form}
                onSubmit={handleSubmit(submitHandler)}
              >
                <Grid container direction="column">
                  <FormControl>
                    <FormLabel id="type">
                      <Typography variant="h5">Тип</Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="type"
                      defaultValue="single"
                      row
                      {...register("type", { required: true })}
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="Сингл"
                      />
                      <FormControlLabel
                        value="album"
                        control={<Radio />}
                        label="Альбом"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel id="date">
                      <Typography variant="h5">Дата релиза</Typography>
                    </FormLabel>
                    <Margin />

                    <Controller
                      control={control}
                      name="date"
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            onChange={(newValue) => {
                              onChange(newValue)
                            }}
                            value={value}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        )
                      }}
                    />
                    <Margin />
                  </FormControl>

                  <Margin />
                  <Typography variant="h5">Основная информация</Typography>
                  <Margin />

                  <Grid>
                    <Grid>Имя артиста:</Grid>
                    <Typography variant="h5">{user?.name}</Typography>
                  </Grid>

                  <TextField
                    label="Имя артиста для этого релиза"
                    {...register("artistName")}
                    multiline
                  />

                  <FormControl>
                    <TextField
                      label="Название релиза"
                      {...register("name", {
                        required: "Обязательное поле",
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                    <Margin />
                  </FormControl>
                </Grid>

                <Grid container direction="column">
                  <Margin />
                  <Typography variant="h5">
                    Этот релиз на цифровых витринах
                  </Typography>

                  <TextField label="Itunes" {...register("itunes")} />
                  <TextField label="Apple music" {...register("appleMusic")} />
                  <TextField label="Spotify" {...register("spotify")} />
                  <TextField
                    label="Яндекс Музыка"
                    {...register("yandexMusic")}
                  />
                  <TextField label="Сбер.Звук" {...register("sberZvuk")} />
                  <TextField
                    label="YouTube Music"
                    {...register("youtubeMusic")}
                  />
                  <Margin />
                </Grid>

                <Grid container direction="column">
                  <Typography variant="h5">Видео</Typography>

                  <TextField
                    label="Ссылка на видео в YouTube / Vimeo"
                    {...register("video")}
                  />
                  <Margin />
                </Grid>

                <Grid container direction="column">
                  <Margin />

                  <FormControl>
                    <FormLabel id="link-type">
                      <Typography variant="h5">
                        Адрес страницы релиза
                      </Typography>
                    </FormLabel>

                    <FormControl>
                      <TextField
                        InputProps={{
                          name: "link",
                          startAdornment: (
                            <InputAdornment position="start">
                              linkmusic.ru/
                            </InputAdornment>
                          ),
                        }}
                        error={!!errors.link}
                        helperText={errors.link?.message}
                        {...register("link", {
                          required: "Обязательное поле",
                          minLength: {
                            value: 3,
                            message: "Ссылка не может быть короче 3 символов",
                          },
                          pattern: {
                            value: /[a-zA-Z0-9_]/,
                            message: "Ссылка содержит недопустимые символы",
                          },
                          onChange: onChangeLinkHandler,
                          validate: () =>
                            !isUniqueLink
                              ? "Релиз с такой ссылкой уже существует"
                              : true,
                        })}
                      />
                    </FormControl>
                  </FormControl>

                  <Margin />
                  <Margin />
                </Grid>

                <Grid container direction="column">
                  <Typography variant="h5">Пиксель Вконтакте</Typography>

                  <TextField
                    label="Вставить код пикселя Вконтакте"
                    {...register("vkPixel")}
                  />
                  <Margin />
                  <Margin />
                  <Typography variant="h5">Пиксель Facebook</Typography>

                  <TextField
                    label="Вставить код пикселя Facebook"
                    {...register("facebookPixel")}
                  />
                </Grid>

                <Grid style={{ padding: "1rem 0" }}>
                  <Button type="submit" className={styles.btn}>
                    Создать
                  </Button>
                  <Button className={styles.btn} variant="outlined">
                    Отменить
                  </Button>
                  <Button
                    className={styles.btn}
                    variant="outlined"
                    color="warning"
                  >
                    Удалить
                  </Button>
                </Grid>
                <Margin />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default withPrivateRoute(withStandardLayout(NewRelease))
