import styles from "pages/artist/Artist.module.scss"
import withStandardLayout from "hoc/withStandardLayout"
import withPrivateRoute from "hoc/withPrivateRoute"
import {
  Button,
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
import { CreateProfileFormType } from "types/general"
import { useAuth } from "context/AuthProvider"
import Margin from "components/Form/Margin"
import LoadImage from "components/Form/LoadImage"

function NewProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProfileFormType>()
  const { createProfile } = useAuth()

  const submitHandler = (data: CreateProfileFormType) => {
    createProfile(data)
  }

  return (
    <>
      <section className="block block_first-on-page">
        <Grid className="vector__bg vector__bg_right-top">
          <img src={"/images/vector-bg_catalog-right.svg"} alt="" />
        </Grid>

        <div className="content">
          <Grid container justifyContent="center">
            <Typography variant="h2">СОЗДАНИЕ ПРОФИЛЯ</Typography>
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
              />

              <Grid className={styles.right_column}>
                <Grid container direction="column">
                  <Typography variant="h5" style={{ paddingTop: ".5rem" }}>
                    Основная информация
                  </Typography>

                  <FormControl>
                    <TextField
                      label="Имя артиста / Название группы"
                      error={!!errors.name}
                      helperText={
                        !!errors.name
                          ? "Обязательное поле"
                          : "Задаётся один раз, без возможности изменения"
                      }
                      {...register("name", { required: true })}
                    />
                  </FormControl>
                  <Margin />

                  <TextField
                    label="Краткое описание"
                    {...register("description")}
                    multiline
                  />
                  <Margin />

                  <TextField label="Адрес сайта" {...register("site")} />
                  <Margin />
                </Grid>

                <Grid container direction="column">
                  <Typography variant="h5" style={{ paddingTop: "1rem" }}>
                    Ссылки на соцсети
                  </Typography>

                  <TextField label="VK" {...register("vk")} />
                  <Margin />
                  <TextField
                    label="Одноклассники"
                    {...register("odnoklassniki")}
                  />
                  <Margin />
                  <TextField label="Youtube" {...register("youtube")} />
                  <Margin />
                  <TextField label="Rutube" {...register("rutube")} />
                  <Margin />
                  <TextField label="Telegram" {...register("telegram")} />
                  <Margin />
                  <TextField label="Facebook" {...register("facebook")} />
                  <Margin />
                  <TextField label="Instagram" {...register("instagram")} />
                  <Margin />
                </Grid>

                <Grid className={styles.create_form_block}>
                  <Typography variant="h5" style={{ paddingTop: "1rem" }}>
                    Кнопка «Заказать выступление»
                  </Typography>
                  <Grid container alignItems="center">
                    <FormControlLabel
                      control={<Switch {...register("canBookPerformance")} />}
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
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </section>
    </>
  )
}

export default withPrivateRoute(withStandardLayout(NewProfile))
