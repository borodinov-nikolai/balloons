import styles from "pages/artist/Artist.module.scss"
import withStandardLayout from "hoc/withStandardLayout"
import withPrivateRoute from "hoc/withPrivateRoute"
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import { useForm } from "react-hook-form"
import { UpdateProfileFormType } from "types/general"
import { useAuth } from "context/AuthProvider"
import Margin from "components/Margin"
import Link from "next/link"
import { useEffect, useState } from "react"
import LoadImage from "components/LoadImage"
import { API } from "lib/api"

function UpdateProfile() {
  const { updateProfile, user } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileFormType>()

  const canBookPerformance = watch("canBookPerformance")
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const submitHandler = (data: UpdateProfileFormType) => {
    updateProfile(data)
  }

  const deleteUserHandler = async () => {
    try {
      await API.delete(`/users/${user?.id}`)
      window.location.replace("/")
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (user)
      reset({
        name: user?.name,
        description: user?.description,
        site: user?.site,
        canBookPerformance: user?.canBookPerformance,
        vk: user?.vk,
        odnoklassniki: user?.odnoklassniki,
        youtube: user?.youtube,
        rutube: user?.rutube,
        telegram: user?.telegram,
        facebook: user?.facebook,
        instagram: user?.instagram,
      })
  }, [reset, user])

  return (
    <>
      <section className="block block_first-on-page">
        <Grid className="vector__bg vector__bg_right-top">
          <img src="/assets/vector-bg_catalog-right.svg" alt="" />
        </Grid>

        <div className="content">
          <Grid container justifyContent="center">
            <Typography variant="h2">РЕДАКТИРОВАНИЕ ПРОФИЛЯ</Typography>
          </Grid>

          <form
            className={styles.create_form}
            onSubmit={handleSubmit(submitHandler)}
          >
            <Grid className={styles.create_main_row}>
              <LoadImage
                formFieldName="avatar"
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                required
                defaultValue={user?.avatar}
              />

              <Grid className={styles.right_column}>
                <Grid container direction="column">
                  <Typography variant="h5" style={{ paddingTop: ".5rem" }}>
                    Основная информация
                  </Typography>

                  <FormControl>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label="Имя артиста / Название группы"
                      disabled
                      {...register("name", { required: true })}
                    />
                  </FormControl>
                  <Margin />
                  <Margin />

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Краткое описание"
                    {...register("description")}
                    multiline
                  />
                  <Margin />

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Адрес сайта"
                    {...register("site")}
                  />
                  <Margin />
                </Grid>

                <Grid container direction="column">
                  <Typography variant="h5" style={{ paddingTop: "1rem" }}>
                    Ссылки на соцсети
                  </Typography>

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="VK"
                    {...register("vk")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Одноклассники"
                    {...register("odnoklassniki")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Youtube"
                    {...register("youtube")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Rutube"
                    {...register("rutube")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Telegram"
                    {...register("telegram")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Facebook"
                    {...register("facebook")}
                  />
                  <Margin />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    label="Instagram"
                    {...register("instagram")}
                  />
                  <Margin />
                </Grid>

                <Grid className={styles.create_form_block}>
                  <Typography variant="h5" style={{ paddingTop: "1rem" }}>
                    Кнопка «Заказать выступление»
                  </Typography>
                  <Grid container alignItems="center">
                    <FormControlLabel
                      control={
                        <Switch
                          {...register("canBookPerformance")}
                          checked={canBookPerformance}
                        />
                      }
                      label="Возможность заказать выступление"
                    />
                    <Tooltip
                      title="Данная функция позволяет получать запросы на коммерческие выступления"
                      className={styles.help_btn}
                      placement="top"
                    >
                      <HelpOutlineIcon color="warning" />
                    </Tooltip>
                  </Grid>
                  <Margin />

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
                        Вы действительно хотите удалить пользователя?
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          className={styles.btn}
                          variant="contained"
                          color="warning"
                          onClick={deleteUserHandler}
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
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </section>
    </>
  )
}

export default withPrivateRoute(withStandardLayout(UpdateProfile))
