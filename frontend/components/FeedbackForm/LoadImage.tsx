import { FormControl, FormHelperText, Grid, Typography } from "@mui/material"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./LoadImage.module.scss"
import { ImageType } from "types/general"
import { useEffect } from "react"
import { getMediaUrl } from "lib/media"

type LoadImageProps = {
  formFieldName: string
  register: Function
  setValue: Function
  watch: Function
  defaultValue?: ImageType
  errors?: Record<string, any>
  required?: boolean
}

function LoadImage({
  formFieldName,
  register,
  errors,
  setValue,
  watch,
  defaultValue = undefined,
  required = false,
}: LoadImageProps) {
  const files = watch(formFieldName)

  const onChange = (e: any) => {
    const file = e.target?.files.item(0)

    if (file.type && !file.type.startsWith("image/")) {
      console.error("File is not an image.", file.type, file)
      return
    }
  }

  const onClearHandler = () => {
    setValue(formFieldName, null)
  }

  useEffect(() => {
    async function createFile() {
      const dt = new DataTransfer()
      const response = await fetch(getMediaUrl(defaultValue))
      const data = await response.blob()
      const fileName = defaultValue?.url?.split("/")[4] || "filename.jpg"
      const file = new File([data], fileName)
      dt.items.add(file)

      setValue(formFieldName, dt.files)
    }

    if (defaultValue) createFile()
  }, [defaultValue, formFieldName, setValue])

  return (
    <Grid>
      <Grid className={styles.load_img}>
        {!!files?.length && (
          <Grid className="square_img_container">
            <CloseIcon className={styles.remove_btn} onClick={onClearHandler} />
            <Image src={URL.createObjectURL(files.item(0))} fill alt="img" />
          </Grid>
        )}

        {!files?.length && (
          <FormControl>
            <label htmlFor="avatar-input" className={styles.load_img_label}>
              <Image
                src={"/assets/image_icon.svg"}
                alt=""
                width={50}
                height={50}
              />

              <Typography variant="h5">Загрузите обложку</Typography>
              <FormHelperText style={{ position: "relative" }}>
                Квадратное изображение 1000x1000 px
              </FormHelperText>
            </label>

            <input
              id="avatar-input"
              style={{ display: "none" }}
              type="file"
              accept=".jpg, .jpeg, .png"
              {...register(formFieldName, {
                onChange,
                required: required && "Обязательное поле",
              })}
            />

            <FormHelperText
              error
              style={{ position: "relative", textAlign: "center" }}
            >
              {errors && errors[formFieldName]?.message}
            </FormHelperText>
          </FormControl>
        )}
      </Grid>
    </Grid>
  )
}

export default LoadImage
