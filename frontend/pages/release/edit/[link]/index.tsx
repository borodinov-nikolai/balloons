import styles from "pages/artist/Artist.module.scss"
import withStandardLayout from "hoc/withStandardLayout"
import withPrivateRoute from "hoc/withPrivateRoute"
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
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
import { DatePicker } from "@mui/x-date-pickers"
import { useAuth } from "context/AuthProvider"
import {
  CreateOrUpdateReleaseFormType,
  PlatformLinkType,
  ReleaseType,
} from "types/general"
import { SyntheticEvent, useEffect, useMemo, useState } from "react"
import { API } from "lib/api"
import { useRouter } from "next/router"
import ReleaseLinkIcon from "components/ReleaseLinkIcon"
import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import Link from "next/link"
import Loader from "components/Loader"
import LoadImage from "components/LoadImage"
import Margin from "components/Margin"

function UpdateRelease() {
  const [release, setRelease] = useState<ReleaseType | null>(null)
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateOrUpdateReleaseFormType>()

  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { link: queryLink } = router.query
  const [deleteConfirm, setDeleteConfirm] = useState(false)

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

  const deleteReleaseHandler = () => {
    alert("Release not deleted")
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
        }
      } catch (e) {
        setError("Что-то пошло не так, перезагрузите страницу")
      }
    }

    fetchData()
    setLoading(false)
  }, [queryLink, reset])

  useEffect(() => {
    reset({
      type: release?.type,
      name: release?.name,
      date: release?.date ? new Date(release.date) : undefined,
      artistName: release?.artistName,
      link: release?.link,
      platformLinks: release?.platformLinks,
      video: release?.video,
      vkPixel: release?.vkPixel,
      facebookPixel: release?.facebookPixel,
    })
  }, [reset, release])

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

      await API.put(`/releases/${release?.id}`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      await router.push(`/artist/${user?.slug}`)
    } catch (e: any) {
      setError(e.message)
    }
  }

  return !release ? (
    <Loader />
  ) : (
    <>
      <section className="block block_first-on-page">
        <div className="vector__bg vector__bg_right-top">
          <img src="/assets/vector-bg_catalog-right.svg" alt="" />
        </div>

        <div className="content">
          <Grid container justifyContent="center">
            <Typography variant="h2">РЕДАКТИРОВАНИЕ РЕЛИЗА</Typography>
          </Grid>

          <div className={styles.create_main_row}>
            <LoadImage
              formFieldName="img"
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              required
              defaultValue={release?.img}
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

                    <Controller
                      rules={{ required: true }}
                      control={control}
                      name="type"
                      defaultValue={release?.type}
                      render={({ field }) => (
                        <RadioGroup aria-labelledby="type" row {...field}>
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
                      )}
                    />
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
                            value={value || 0}
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
                    <Typography variant="h5">{release?.user?.name}</Typography>
                  </Grid>

                  <TextField
                    label="Имя артиста для этого релиза"
                    {...register("artistName")}
                  />

                  <Margin />

                  <TextField
                    label="Название релиза"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name", { required: "Обязательное поле" })}
                  />

                  <Margin />
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
                          style={{ margin: ".5rem 0" }}
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
                      style={{ margin: ".5rem 0" }}
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

                    <TextField
                      InputProps={{
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
                        pattern: {
                          value: /[a-zA-Z0-9_]/,
                          message: "Ссылка содержит недопустимые символы",
                        },
                        // validate: () =>
                        // // @ts-ignore
                        // uniqLinkData?.releases.length > 0
                        //   ? "Релиз с такой ссылкой уже существует"
                        //   : true,
                      })}
                    />
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
                    <Link href={`/artist/${user?.slug}`}>Отменить</Link>
                  </Button>
                  <Button
                    className={styles.btn}
                    variant="outlined"
                    color="warning"
                    onClick={() => setDeleteConfirm(true)}
                  >
                    Удалить
                  </Button>

                  <Dialog
                    open={deleteConfirm}
                    onClose={() => setDeleteConfirm(false)}
                  >
                    <DialogTitle>
                      Вы действительно хотите удалить релиз?
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        className={styles.btn}
                        variant="contained"
                        color="warning"
                        onClick={deleteReleaseHandler}
                      >
                        Удалить
                      </Button>
                      <Button
                        className={styles.btn}
                        variant="outlined"
                        onClick={() => setDeleteConfirm(false)}
                      >
                        Отмена
                      </Button>
                    </DialogActions>
                  </Dialog>
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
