import React, { FC } from "react"
import { Grid, Typography } from "@mui/material"

type ErrorPageComponentPropsType = {
  statusCode: number
}

const ErrorPageComponent: FC<ErrorPageComponentPropsType> = ({
  statusCode,
}) => {
  return (
    <Grid>
      <Typography>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Typography>
    </Grid>
  )
}

export default ErrorPageComponent
