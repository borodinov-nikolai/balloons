import styles from "pages/artist/Artist.module.scss"
import withStandardLayout from "hoc/withStandardLayout"
import withPrivateRoute from "hoc/withPrivateRoute"
import {
  Autocomplete,
  Button,
  Fade,
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
import { Controller, useFieldArray, useForm } from "react-hook-form"
import Margin from "components/FeedbackForm/Margin"
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth } from "context/AuthProvider"
import {
  CreateReleaseFormType,
  PlatformLinkType,
  ReleaseType,
} from "types/general"
import { SyntheticEvent, useEffect, useMemo, useState } from "react"
import { API } from "lib/api"
import { useRouter } from "next/router"
import ReleaseLinkIcon from "components/ReleaseLinkIcon"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"

function UpdateRelease() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateReleaseFormType>()

  const { user } = useAuth()
  const watchLink = watch("link")
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { link: queryLink } = router.query
  const [release, setRelease] = useState<ReleaseType | null>(null)

  const {
    fields: platformLinks,
    append: appendPlatformLink,
    remove: removePlatformLink,
  } = useFieldArray({
    control,
    name: "platformLinks",
  })

  const watchFieldArray = watch("platformLinks")
  const controlledFields = platformLinks.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })

  const linksOptions = useMemo(() => {
    const defaultLinkOptions: PlatformLinkType[] = [
      { type: "appleMusic", title: "Apple Music" },
      { type: "vkMusic", title: "VK Музыка" },
      { type: "iTunes", title: "iTunes" },
      { type: "yandexMusic", title: "Яндекс Музыка" },
      { type: "zvuk", title: "Zvuk" },
      { type: "spotify", title: "Spotify" },
      { type: "youTubeMusic", title: "YouTube.Music" },
      { type: "ok", title: "ok.ru" },
      { type: "tikTok", title: "TikTok" },
      { type: "amazonMusic", title: "Amazon Music" },
      { type: "mtsMusic", title: "MTS Music" },
      { type: "deezer", title: "Deezer" },
      { type: "soundCloud", title: "SoundCloud" },
      { type: "beatport", title: "Beatport" },
      { type: "beelineMusic", title: "Beeline Music" },
      { type: "tidal", title: "Tidal" },
      { type: "triller", title: "Triller" },
      { type: "huaweiMusic", title: "Huawei Music" },
      { type: "shazam", title: "Shazam" },
    ]
    const selectedPlatformType = platformLinks.map((it) => it.type)
    return defaultLinkOptions.filter(
      (it) => !selectedPlatformType.includes(it.type)
    )
  }, [platformLinks])

  const addPlatformLinkHandler = (
    e: SyntheticEvent,
    value: PlatformLinkType
  ) => {
    const { type, title } = value
    appendPlatformLink({ type, title, link: "" })
  }

  const deletePlatformLinkHandler = (index: number) => {
    removePlatformLink(index)
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await API.get("/releases", {
          params: {
            populate: "*",
            "filters[link][$eq]": queryLink,
          },
        })

        if (data.length > 0) {
          const release = data[0]
          setRelease(release)
          reset({
            type: release.type,
            name: release.name,
            date: new Date(release.date),
            artistName: release.artistName,
            platformLinks: release.platformLinks,
            video: release.video,
            vkPixel: release.vkPixel,
            facebookPixel: release.facebookPixel,
          })
        }
        // setError("")
      } catch (e) {
        // setError("Что-то пошло не так, перезагрузите страницу")
      }
    }

    fetchData()
    setLoading(false)
  }, [queryLink, reset])

  const submitHandler = async (form: CreateReleaseFormType) => {
    console.log("form", form)
  }

  return (
    <>
      <section className="block block_first-on-page">
        <div className="vector__bg vector__bg_right-top">
          <img src={"/assets/vector-bg_catalog-right.svg"} alt="" />
        </div>

        <div className="content">
          <Grid container justifyContent="center">
            <Typography variant="h2">РЕДАКТИРОВАНИЕ РЕЛИЗА</Typography>
          </Grid>

          <div className={styles.create_main_row}>
            {/*<LoadImage*/}
            {/*  formFieldName="img"*/}
            {/*  register={register}*/}
            {/*  errors={errors}*/}
            {/*  setValue={setValue}*/}
            {/*  watch={watch}*/}
            {/*  required*/}
            {/*  defaultValue={release?.img}*/}
            {/*/>*/}
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
                    <Typography variant="h5">{release?.user?.name}</Typography>
                  </Grid>

                  <TextField
                    label="Имя артиста для этого релиза"
                    {...register("artistName")}
                    multiline
                  />

                  <FormControl>
                    <TextField
                      label="Название релиза"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      {...register("name", {
                        required: "Обязательное поле",
                      })}
                    />
                    <Margin />
                  </FormControl>
                </Grid>

                <Grid container direction="column">
                  <Margin />
                  <Typography variant="h5">
                    Этот релиз на цифровых витринах
                  </Typography>

                  {controlledFields.map((link, index) => {
                    return (
                      <Fade key={link.id} in={!!link.id}>
                        <Grid
                          container
                          wrap="nowrap"
                          style={{
                            margin: ".5rem 0",
                          }}
                        >
                          <ReleaseLinkIcon
                            type={link.type}
                            style={{ marginRight: ".5rem" }}
                          />
                          <TextField
                            {...register(`platformLinks.${index}.link`)}
                            placeholder={link.title}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    deletePlatformLinkHandler(index)
                                  }
                                >
                                  <ClearIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Fade>
                    )
                  })}

                  {!!linksOptions.length && (
                    <Grid
                      container
                      wrap="nowrap"
                      alignItems="center"
                      style={{
                        margin: ".5rem 0",
                      }}
                    >
                      <AddIcon
                        style={{
                          padding: ".2rem",
                          marginRight: ".5rem",
                          width: "32px",
                        }}
                      />

                      <Autocomplete
                        disablePortal
                        clearOnEscape
                        size="small"
                        disableClearable
                        noOptionsText="Нет доступных вариантов"
                        openText="Открыть"
                        options={linksOptions}
                        fullWidth
                        // @ts-ignore
                        value={{ type: "", title: "" }}
                        getOptionLabel={(option) => option.title}
                        onChange={addPlatformLinkHandler}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Добавить витрину"
                          />
                        )}
                      />
                    </Grid>
                  )}

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
                    Сохранить
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

export default withPrivateRoute(withStandardLayout(UpdateRelease))