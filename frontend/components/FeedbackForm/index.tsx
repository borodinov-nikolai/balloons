import Captcha from "components/Captcha"
import styles from "./Form.module.scss"
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { FeedbackFormType } from "types/general"
import {
  MutableRefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import IMask from "imask"
import { API } from "lib/api"
import CloseIcon from "@mui/icons-material/Close"
import Confirm from "components/Confirm"
import Link from "next/link"
import Margin from "components/Margin"
import emailjs from "@emailjs/browser"

function FeedbackForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormType>()

  const phoneInputRef = useRef()
  const formRef = useRef() as MutableRefObject<HTMLFormElement>
  const [status, setStatus] = useState("")
  const files = watch("attachment")
  const submitHandler = async (form: FeedbackFormType) => {
    try {
      emailjs.sendForm(
        "service_dco6sue",
        "template_rhyrlyt",
        formRef.current,
        "HS5fnjFCpJeoNll7x"
      )
      const { status } = await API.post(
        "feedbacks",
        {
          data: JSON.stringify({ ...form, attachment: undefined }),
          "files.attachment": form.attachment?.item(0),
        },
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )

      if (status === 200) setStatus("success")
    } catch (e: any) {
      console.error(e.message)
    }
  }

  const clearFileHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    setValue("attachment", undefined)
  }

  useEffect(() => {
    if (phoneInputRef.current)
      IMask(phoneInputRef.current, { mask: "+{7} (000) 000-00-00" })
  })

  const messageThemes = [
    { value: "Создание страниц", text: "Создание страниц" },
    { value: "Менеджмент", text: "Менеджмент" },
    { value: "Организация мероприятий", text: "Организация мероприятий" },
    { value: "Дистрибуция", text: "Дистрибуция" },
    { value: "Продвижение", text: "Продвижение" },
    { value: "Прочие вопросы", text: "Прочие вопросы" },
  ]

  return (
    <div className={`block ${styles.blockForm}`}>
      <span key="contacts-anchor" id="contacts" className="block__anchor" />
      <div className="content">
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <div className="left-img">
              <img
                src={"/assets/headphones-notes.png"}
                alt="headphones and notes"
              />
            </div>
            <div className={styles.leftTitle}>
              Опишите свои потребности - и мы свяжемся с вами
            </div>
            <div className={styles.leftText}>
              Мы обрабатываем все запросы и можем найти индивидуальное решение
              для каждого клиента
            </div>
          </div>

          <div className={styles.column}>
            <form className={styles.form} ref={formRef}>
              <Typography variant="h5">Напишите нам</Typography>
              <Margin />

              <div className={styles.inputGroup}>
                <FormControl fullWidth>
                  <InputLabel id="message-form-label" required>
                    Тема сообщения
                  </InputLabel>
                  <Margin />
                  <Controller
                    rules={{ required: true }}
                    name="messageSubject"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      // @ts-ignore
                      <Select
                        displayEmpty
                        labelId="message-form-label"
                        defaultValue=""
                        error={!!errors.messageSubject}
                        {...field}
                      >
                        {messageThemes.map((it) => (
                          <MenuItem key={it.value} value={it.value}>
                            {it.text}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.messageSubject && (
                    <FormHelperText error>Обязательное поле</FormHelperText>
                  )}
                </FormControl>
              </div>

              <TextField
                className={styles.inputGroup}
                fullWidth
                label="Имя"
                error={!!errors.name}
                helperText={errors.name && "Обязательное поле"}
                placeholder="Как к вам обращаться?"
                required
                {...register("name", { required: true })}
              />

              <div className={styles.inputGroup}>
                <TextField
                  fullWidth
                  label="Телефон"
                  inputRef={phoneInputRef}
                  {...register("phone")}
                />

                <span style={{ width: "4rem" }} />
                <TextField
                  fullWidth
                  label="E-mail"
                  error={!!errors.email}
                  helperText={errors.email && "Обязательное поле"}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Неправильный адрес",
                    },
                  })}
                />
              </div>

              <TextField
                variant="outlined"
                className={styles.inputGroup}
                fullWidth
                label="Сообщение"
                error={!!errors.message}
                helperText={errors.message && "Обязательное поле"}
                {...register("message", { required: true })}
                required
                multiline
                rows={5}
              />

              {/* <div className={`${styles.inputRow} ${styles.inputRow_file}`}>
                <label
                  htmlFor="form-file"
                  className={`${styles.label} ${styles.label_file}`}
                >
                  {files?.length ? (
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid>{files.item(0)?.name}</Grid>
                      <CloseIcon onClick={clearFileHandler} />
                    </Grid>
                  ) : (
                    <svg
                      width="113"
                      height="14"
                      viewBox="0 0 113 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.25027 1.25905C7.56514 -0.0281625 9.66771 -0.0284424 10.9829 1.25842C12.3184 2.5651 12.3417 4.70702 11.0351 6.04251L5.52036 11.5572C5.5058 11.5742 5.48998 11.59 5.47298 11.6046C5.29084 11.7606 5.01671 11.7394 4.86072 11.5572C4.70473 11.3751 4.72595 11.1009 4.9081 10.945L10.4228 5.43024C11.4051 4.44758 11.4048 2.85467 10.4221 1.87238C9.43948 0.890104 7.84659 0.890383 6.86429 1.87305L1.3496 7.38776C0.691312 8.05554 0.691312 9.12819 1.3496 9.79597C2.01461 10.4706 3.10059 10.4784 3.77519 9.81335L8.7688 4.81974C9.06305 4.51256 9.06305 4.0281 8.7688 3.72093C8.4654 3.40419 7.96264 3.39337 7.6459 3.69681L2.86939 8.47331C2.70111 8.63584 2.43434 8.63584 2.26606 8.47331C2.09356 8.30671 2.08877 8.03182 2.25537 7.85932L7.03191 3.08281C7.68109 2.43363 8.73364 2.43363 9.38282 3.08281C10.032 3.73199 10.032 4.78455 9.38282 5.43373L4.38918 10.4274C3.3853 11.4081 1.78203 11.4081 0.77815 10.4274C-0.242525 9.4302 -0.261582 7.79444 0.735583 6.77377L6.25027 1.25905ZM26.728 6.85722C26.4667 6.45589 26.1073 6.14322 25.65 5.91922C26.3593 5.43389 26.714 4.75255 26.714 3.87522C26.714 3.11922 26.448 2.48455 25.916 1.97122C25.3933 1.45789 24.7447 1.20122 23.97 1.20122H20.05V11.0012H24.278C25.0713 11.0012 25.7433 10.7352 26.294 10.2032C26.8447 9.67122 27.12 9.01322 27.12 8.22922C27.12 7.71589 26.9893 7.25855 26.728 6.85722ZM21.352 2.41922H23.97C24.3713 2.41922 24.712 2.56855 24.992 2.86722C25.2813 3.15655 25.426 3.50655 25.426 3.91722C25.426 4.33722 25.286 4.69189 25.006 4.98122C24.726 5.27055 24.3807 5.41522 23.97 5.41522H21.352V2.41922ZM24.278 9.78322H21.352V6.60522H24.278C24.7167 6.60522 25.0807 6.75922 25.37 7.06722C25.678 7.37522 25.832 7.74855 25.832 8.18722C25.832 8.63522 25.6827 9.01322 25.384 9.32122C25.0853 9.62922 24.7167 9.78322 24.278 9.78322ZM31.4913 6.52122H29.7553V4.00122H28.5373V11.0012H31.4913C32.1819 11.0012 32.7606 10.7959 33.2273 10.3852C33.6939 9.96522 33.9273 9.42389 33.9273 8.76122C33.9273 8.09855 33.6939 7.56189 33.2273 7.15122C32.7699 6.73122 32.1913 6.52122 31.4913 6.52122ZM34.8373 4.00122V11.0012H36.0553V4.00122H34.8373ZM31.4913 9.86722H29.7553V7.64122H31.4913C31.8366 7.64122 32.1259 7.74855 32.3593 7.96322C32.6019 8.16855 32.7233 8.43455 32.7233 8.76122C32.7233 9.08789 32.6066 9.35389 32.3733 9.55922C32.1399 9.76455 31.8459 9.86722 31.4913 9.86722ZM38.5322 10.1612C39.2042 10.8426 40.0582 11.1832 41.0942 11.1832C42.0929 11.1832 42.9235 10.8752 43.5862 10.2592C44.2395 9.63389 44.5662 8.84522 44.5662 7.89322C44.5662 6.95989 44.2582 6.18989 43.6422 5.58322C43.0449 4.98589 42.3029 4.68722 41.4162 4.68722C40.9495 4.68722 40.4922 4.78055 40.0442 4.96722C39.6055 5.15389 39.2415 5.42455 38.9522 5.77922C39.0829 5.34989 39.2975 4.99522 39.5962 4.71522C39.8949 4.43522 40.3569 4.15989 40.9822 3.88922L41.4302 3.70722L41.8922 3.51122L41.9762 3.46922L42.1162 3.39922C42.1815 3.37122 42.2422 3.34322 42.2982 3.31522C42.4475 3.24989 42.6949 3.10989 43.0402 2.89522C43.1055 2.85789 43.1569 2.82055 43.1942 2.78322C43.2409 2.74589 43.2829 2.70855 43.3202 2.67122L43.4182 2.57322C43.4369 2.54522 43.4695 2.50322 43.5162 2.44722C43.5629 2.38189 43.5909 2.33989 43.6002 2.32122C43.7495 2.12522 43.8569 1.86389 43.9222 1.53722L42.9422 0.97722C42.8955 1.49989 42.4989 1.94789 41.7522 2.32122L40.9962 2.65722C40.9122 2.69455 40.8095 2.74122 40.6882 2.79722C40.5762 2.84389 40.4782 2.88589 40.3942 2.92322L40.1982 3.02122C39.1155 3.54389 38.3969 4.12722 38.0422 4.77122C37.6969 5.40589 37.5242 6.32522 37.5242 7.52922C37.5242 8.59322 37.8602 9.47055 38.5322 10.1612ZM42.7322 6.36722C43.1429 6.75922 43.3482 7.26789 43.3482 7.89322C43.3482 8.49989 43.1335 9.00389 42.7042 9.40522C42.2935 9.80655 41.7569 10.0072 41.0942 10.0072C40.4409 10.0072 39.8949 9.80189 39.4562 9.39122C39.0175 8.98055 38.7982 8.45789 38.7982 7.82322C38.7982 7.21655 39.0362 6.72189 39.5122 6.33922C40.0069 5.95655 40.5482 5.76522 41.1362 5.76522C41.7989 5.76522 42.3309 5.96589 42.7322 6.36722ZM52.2295 4.89722C51.5389 4.17855 50.7035 3.81922 49.7235 3.81922C48.5662 3.81922 47.6842 4.28122 47.0775 5.20522V4.00122H45.8595V13.8012H47.0775V9.79722C47.6842 10.7212 48.5662 11.1832 49.7235 11.1832C50.7129 11.1832 51.5482 10.8286 52.2295 10.1192C52.9202 9.40055 53.2655 8.52789 53.2655 7.50122C53.2655 6.48389 52.9202 5.61589 52.2295 4.89722ZM51.3335 9.29322C50.8575 9.76922 50.2695 10.0072 49.5695 10.0072C48.8602 10.0072 48.2675 9.76922 47.7915 9.29322C47.3155 8.79855 47.0775 8.20122 47.0775 7.50122C47.0775 6.79189 47.3155 6.19922 47.7915 5.72322C48.2675 5.23789 48.8602 4.99522 49.5695 4.99522C50.2695 4.99522 50.8575 5.23789 51.3335 5.72322C51.8095 6.19922 52.0475 6.79189 52.0475 7.50122C52.0475 8.20122 51.8095 8.79855 51.3335 9.29322ZM60.5149 4.00122V5.20522C59.9176 4.28122 59.0356 3.81922 57.8689 3.81922C56.8889 3.81922 56.0536 4.17855 55.3629 4.89722C54.6723 5.61589 54.3269 6.48389 54.3269 7.50122C54.3269 8.52789 54.6723 9.40055 55.3629 10.1192C56.0443 10.8286 56.8796 11.1832 57.8689 11.1832C59.0356 11.1832 59.9176 10.7212 60.5149 9.79722V11.0012H61.7329V4.00122H60.5149ZM59.8009 9.29322C59.3249 9.76922 58.7323 10.0072 58.0229 10.0072C57.3229 10.0072 56.7349 9.76922 56.2589 9.29322C55.7829 8.79855 55.5449 8.20122 55.5449 7.50122C55.5449 6.79189 55.7829 6.19922 56.2589 5.72322C56.7349 5.23789 57.3229 4.99522 58.0229 4.99522C58.7323 4.99522 59.3249 5.23789 59.8009 5.72322C60.2769 6.19922 60.5149 6.79189 60.5149 7.50122C60.5149 8.20122 60.2769 8.79855 59.8009 9.29322ZM68.7863 4.00122H62.7943V5.17722H65.1883V11.0012H66.4063V5.17722H68.7863V4.00122ZM72.8077 6.52122H71.0717V4.00122H69.8537V11.0012H72.8077C73.4984 11.0012 74.077 10.7959 74.5437 10.3852C75.0104 9.96522 75.2437 9.42389 75.2437 8.76122C75.2437 8.09855 75.0104 7.56189 74.5437 7.15122C74.0864 6.73122 73.5077 6.52122 72.8077 6.52122ZM72.8077 9.86722H71.0717V7.64122H72.8077C73.153 7.64122 73.4424 7.74855 73.6757 7.96322C73.9184 8.16855 74.0397 8.43455 74.0397 8.76122C74.0397 9.08789 73.923 9.35389 73.6897 9.55922C73.4564 9.76455 73.1624 9.86722 72.8077 9.86722ZM84.4629 13.8012V11.1412C85.5549 11.0199 86.4276 10.6232 87.0809 9.95122C87.7342 9.28855 88.0609 8.47189 88.0609 7.50122C88.0609 6.53055 87.7342 5.71389 87.0809 5.05122C86.4276 4.37922 85.5549 3.98255 84.4629 3.86122V1.20122H83.2589V3.86122C82.1669 3.98255 81.2942 4.37922 80.6409 5.05122C79.9876 5.71389 79.6609 6.53055 79.6609 7.50122C79.6609 8.47189 79.9876 9.28855 80.6409 9.95122C81.2942 10.6232 82.1669 11.0199 83.2589 11.1412V13.8012H84.4629ZM81.4949 9.15322C81.0749 8.70522 80.8649 8.15455 80.8649 7.50122C80.8649 6.83855 81.0796 6.28789 81.5089 5.84922C81.9382 5.40122 82.5216 5.13055 83.2589 5.03722V9.96522C82.5122 9.86255 81.9242 9.59189 81.4949 9.15322ZM84.4629 9.96522V5.03722C85.2002 5.13989 85.7789 5.41522 86.1989 5.86322C86.6282 6.30189 86.8429 6.84789 86.8429 7.50122C86.8429 8.15455 86.6282 8.70522 86.1989 9.15322C85.7789 9.59189 85.2002 9.86255 84.4629 9.96522ZM95.2962 4.00122V5.20522C94.6988 4.28122 93.8168 3.81922 92.6502 3.81922C91.6702 3.81922 90.8348 4.17855 90.1442 4.89722C89.4535 5.61589 89.1082 6.48389 89.1082 7.50122C89.1082 8.52789 89.4535 9.40055 90.1442 10.1192C90.8255 10.8286 91.6608 11.1832 92.6502 11.1832C93.8168 11.1832 94.6988 10.7212 95.2962 9.79722V11.0012H96.5142V4.00122H95.2962ZM94.5822 9.29322C94.1062 9.76922 93.5135 10.0072 92.8042 10.0072C92.1042 10.0072 91.5162 9.76922 91.0402 9.29322C90.5642 8.79855 90.3262 8.20122 90.3262 7.50122C90.3262 6.79189 90.5642 6.19922 91.0402 5.72322C91.5162 5.23789 92.1042 4.99522 92.8042 4.99522C93.5135 4.99522 94.1062 5.23789 94.5822 5.72322C95.0582 6.19922 95.2962 6.79189 95.2962 7.50122C95.2962 8.20122 95.0582 8.79855 94.5822 9.29322ZM99.5075 2.95122H103.288V1.88722H99.5075V2.95122ZM103.442 4.00122L99.5635 8.91522V4.00122H98.3596V11.0012H99.3395L103.218 6.08722V11.0012H104.422V4.00122H103.442ZM112.114 4.00122H106.92V8.00522C106.92 8.73322 106.803 9.24189 106.57 9.53122C106.336 9.81122 105.977 9.91855 105.492 9.85322V11.0012C106.36 11.0852 107.018 10.8939 107.466 10.4272C107.914 9.95122 108.138 9.15322 108.138 8.03322V5.17722H110.896V11.0012H112.114V4.00122Z"
                        fill="url(#paint0_linear_599:238)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_599:238"
                          x1="0"
                          y1="7.04734"
                          x2="112.114"
                          y2="7.04734"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3434FF" />
                          <stop offset="1" stopColor="#FF6534" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}

                  <TextField
                    type="file"
                    id="form-file"
                    {...register("attachment")}
                  />
                </label>
              </div> */}

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

              <div className={styles.btnRow}>
                <Button
                  className={styles.sendBtn}
                  onClick={handleSubmit(submitHandler)}
                >
                  Отправить
                </Button>

                <div className={styles.politic}>
                  Отправляя сообщение вы соглашаетесь с{" "}
                  <div className="link">
                    <Link href={"/privacy-policy"}>
                      Политикой конфиденциальности
                    </Link>
                  </div>
                </div>
              </div>

              <Confirm
                text="Вы успешно отправили сообщение"
                open={status === "success"}
                onSuccess={() => {
                  setStatus("")
                  reset()
                }}
              />
            </form>
          </div>
        </div>
      </div>

      <div className="vector__bg vector__bg_4">
        <svg
          width="530"
          height="732"
          viewBox="0 0 530 732"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M439.086 71.9202C439.086 71.9202 301.349 67.833 263.339 204.329C226.16 337.828 123.703 306.71 77.8451 370.282C31.9868 433.855 54.3268 549.624 171.756 560.341C276.512 569.904 272.904 633.5 294.556 669.794C316.208 706.088 367.904 730 367.904 730"
            stroke="url(#paint0_linear_599:61)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M371.906 601.5C371.906 601.5 274.898 513.4 185.742 505.619C96.5859 497.838 102.416 432.697 118.747 410.268C152.633 363.761 266.209 381.92 294.595 300.124C315.909 238.645 294.32 143.263 403.154 123.18"
            stroke="url(#paint1_linear_599:61)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M367.904 533C367.904 533 231.824 514.155 263.189 456.374C299.101 390.161 341.113 401.949 323.854 302.258C317.655 266.834 345.994 137.329 417.745 183.029"
            stroke="url(#paint2_linear_599:61)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_599:61"
              x1="345.755"
              y1="48.3006"
              x2="184.952"
              y2="683.7"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_599:61"
              x1="344.268"
              y1="108.278"
              x2="228.624"
              y2="565.239"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_599:61"
              x1="396.04"
              y1="173.895"
              x2="308.552"
              y2="519.595"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default FeedbackForm
