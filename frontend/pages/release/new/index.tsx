import styles from "../Release.module.scss"
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
import Margin from "components/Margin"
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth } from "context/AuthProvider"
import { CreateOrUpdateReleaseFormType, PlatformLinkType } from "types/general"
import { useRouter } from "next/router"
import useReleaseLink from "hooks/releaseLink.hooks"
import { SyntheticEvent, useMemo, useState } from "react"
import ReleaseLinkIcon from "components/ReleaseLinkIcon"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import { API } from "lib/api"
import LoadImage from "components/LoadImage"

function NewRelease() {
  const { uniqueLink, fetchUniqueLink } = useReleaseLink()
  const { user } = useAuth()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateOrUpdateReleaseFormType>({
    mode: "all",
    defaultValues: {
      date: new Date(),
      link: useMemo(() => uniqueLink, [uniqueLink]),
      user: user?.id,
      platformLinks: [
        { type: "appleMusic", title: "Apple Music" },
        { type: "iTunes", title: "iTunes" },
        { type: "vkMusic", title: "VK music" },
        { type: "yandexMusic", title: "Яндекс.Музыка" },
        { type: "youTubeMusic", title: "YouTube Music" },
      ],
    },
  })

  const router = useRouter()
  const [error, setError] = useState()

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
      { type: "zvuk", title: "Звук" },
      { type: "spotify", title: "Spotify" },
      { type: "youTubeMusic", title: "YouTube.Music" },
      { type: "ok", title: "Одноклассники" },
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

  const submitHandler = async (form: CreateOrUpdateReleaseFormType) => {
    try {
      const formData = {
        data: JSON.stringify({
          ...form,
          platformLinks: form.platformLinks.filter((it) => !!it.link),
          img: form.img?.item(0),
        }),
        "files.img": form.img?.item(0),
      }

      await API.post("releases", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      await router.push(`/artist/${user?.slug}`)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const addPlatformLinkHandler = (
    e: SyntheticEvent,
    value: PlatformLinkType
  ) => {
    const { type, title } = value
    appendPlatformLink({ type, title, link: "" })
  }

  return (
    <>
      <section className="block block_first-on-page">
        <div className="vector__bg vector__bg_right-top">
          <img src="/assets/vector-bg_catalog-right.svg" alt="" />
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
              <form onSubmit={handleSubmit(submitHandler)}>
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
                            // @ts-ignore
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
                                  onClick={() => removePlatformLink(index)}
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
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ cursor: "pointer" }}
                              onClick={fetchUniqueLink}
                            >
                              <RotateLeftIcon />
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
                            value: /[a-zA-Z0-9_-]/,
                            message: "Ссылка содержит недопустимые символы",
                          },
                          validate: async () => {
                            try {
                              const {
                                data: { data },
                              } = await API.get("/release-link")
                              return !data
                                ? "Релиз с такой ссылкой уже существует"
                                : true
                            } catch (e) {
                              return "Ошибка проверки уникальности"
                            }
                          },
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
                  <Button
                    className={styles.btn}
                    variant="outlined"
                    href={`/artist/${user?.slug}`}
                  >
                    Отменить
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
