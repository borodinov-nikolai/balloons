import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
  Theme,
  useMediaQuery,
} from "@mui/material"
import React, { FC, useEffect, useRef, useState } from "react"

import { Controller, useForm } from "react-hook-form"
import { BookingFormType } from "types/general"
import styles from "components/FeedbackForm/Form.module.scss"
import { DatePicker } from "@mui/x-date-pickers"
import IMask from "imask"
import CloseIcon from "@mui/icons-material/Close"
import { API } from "../../../lib/api"

type BookingModalProps = {
  open: boolean
  onClose: Function
  artistName: string | undefined
}

const BookingModal: FC<BookingModalProps> = ({ open, onClose, artistName }) => {
  const phoneInputRef = useRef()
  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  )
  const [status, setStatus] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<BookingFormType>({
    defaultValues: { artistName },
  })

  const submitHandler = async (form: BookingFormType) => {
    try {
      const { status } = await API.post("bookings", {
        data: form,
      })

      if (status === 200) setStatus("success")
    } catch (e: any) {
      console.error(e.message)
      setStatus("error")
    }
  }

  useEffect(() => {
    if (phoneInputRef.current)
      IMask(phoneInputRef.current, { mask: "+{7} (000) 000-00-00" })
  })

  if (status === "success")
    return (
      <Dialog fullWidth open={open} fullScreen={fullScreen}>
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          {artistName}
          {/* @ts-ignore */}
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          Вы успешно отправили заявку. В ближайшее время мы с вами свяжемся.
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              onClose()
              reset()
              setStatus("")
            }}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    )

  return (
    <Dialog fullWidth open={open} fullScreen={fullScreen}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        {artistName}
        {/* @ts-ignore */}
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            className={styles.inputGroup}
            fullWidth
            label="Имя"
            error={!!errors.userName}
            helperText={errors.userName && "Обязательное поле"}
            placeholder="Как к вам обращаться?"
            required
            {...register("userName", { required: true })}
          />

          <TextField
            className={styles.inputGroup}
            fullWidth
            label="Нормер телефона"
            error={!!errors.phone}
            helperText={errors.phone && "Обязательное поле"}
            inputRef={phoneInputRef}
            required
            {...register("phone", { required: true })}
          />

          <TextField
            className={styles.inputGroup}
            fullWidth
            label="E-mail"
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            {...register("email", {
              required: { value: true, message: "Обязательное поле" },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Неправильный адрес",
              },
            })}
          />

          <FormControl>
            <Controller
              rules={{ required: true }}
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    className={styles.inputGroup}
                    label="Дата мероприятия"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.date,
                        helperText: errors.date && "Обязательное поле",
                        required: true,
                      },
                    }}
                    onChange={(newValue) => {
                      // @ts-ignore
                      onChange(newValue)
                    }}
                    value={value}
                    // @ts-ignore
                    renderInput={(params) => <TextField {...params} />}
                  />
                )
              }}
            />
          </FormControl>

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
            rows={3}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={handleSubmit(submitHandler)}>
          Отправить заявку
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BookingModal
