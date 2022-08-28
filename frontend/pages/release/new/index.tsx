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
import randomString from "lib/randomLnk"
import { useRouter } from "next/router"

function NewRelease() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateReleaseFormType>({
    defaultValues: {
      date: new Date(),
      link: randomString(),
    },
  })
  const { user } = useAuth()
  const watchLink = watch("link")
  const router = useRouter()

  // useEffect(() => {
  //   async function fetchData() {
  //     await refetch()
  //     await trigger("link")
  //   }
  //
  //   fetchData()
  // }, [refetch, trigger, watchLink])

  const submitHandler = async (form: CreateReleaseFormType) => {
    if (user) form.user = { connect: { id: user.id } }

    await router.push(`/artist/${user?.slug}`)
  }

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

                  <TextField label="VK" {...register("vk")} />
                  <TextField
                    label="Одноклассники"
                    {...register("odnoklassniki")}
                  />
                  <TextField label="Youtube" {...register("youtube")} />
                  <TextField label="Rutube" {...register("rutube")} />
                  <TextField label="Telegram" {...register("telegram")} />
                  <TextField label="Facebook" {...register("facebook")} />
                  <TextField label="Instagram" {...register("instagram")} />
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
                            value: 7,
                            message: "Ссылка не может быть короче 7 символов",
                          },
                          pattern: {
                            value: /[a-zA-Z0-9_]/,
                            message: "Ссылка содержит недопустимые символы",
                          },
                          validate: () =>
                            // @ts-ignore
                            uniqLinkData?.releases.length > 0
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
                    {...register("vk")}
                  />
                  <Margin />
                  <Margin />
                  <Typography variant="h5">Пиксель Facebook</Typography>

                  <TextField
                    label="Вставить код пикселя Facebook"
                    {...register("youtube")}
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
