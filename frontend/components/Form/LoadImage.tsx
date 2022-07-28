import { FormControl, FormHelperText, Grid, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./LoadImage.module.scss";
import { ImageType } from "types/general";
import { useEffect } from "react";

type LoadImageProps = {
  formFieldName: string;
  register: Function;
  setValue: Function;
  watch: Function;
  defaultValue?: ImageType | null;
  errors?: Record<string, any>;
  required?: boolean;
};

function LoadImage({
  formFieldName,
  register,
  errors,
  setValue,
  watch,
  defaultValue = null,
  required = false,
}: LoadImageProps) {
  const files = watch(formFieldName);

  const onChange = (e: any) => {
    const file = e.target?.files[0];

    if (file.type && !file.type.startsWith("image/")) {
      console.error("File is not an image.", file.type, file);
      return;
    }
  };

  const onClearHandler = () => {
    setValue(formFieldName, null);
  };

  useEffect(() => {
    async function createFile() {
      const dt = new DataTransfer();
      const response = await fetch(defaultValue?.url || "");
      const data = await response.blob();
      const fileName = defaultValue?.url?.split("/")[4] || "filename.jpg";

      const file = new File([data], fileName);
      dt.items.add(file);
      setValue(formFieldName, dt.files);
    }

    if (defaultValue) createFile();
  }, [defaultValue, formFieldName, setValue]);

  return (
    <Grid>
      <Grid className={styles.load_img}>
        {!!files?.length && (
          <>
            <CloseIcon className={styles.remove_btn} onClick={onClearHandler} />
            <Image
              src={URL.createObjectURL(files.item(0))}
              width="3000px"
              height="3000px"
            />
          </>
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
              <FormHelperText>
                Квадратное изображение 3000x3000 px
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
          </FormControl>
        )}
      </Grid>
      <Typography align="center" color="#d32f2f">
        {errors && errors[formFieldName]?.message}
      </Typography>
    </Grid>
  );
}

export default LoadImage;
