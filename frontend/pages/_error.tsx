import React from "react"
import Head from "next/head"
import { NextPage } from "next"
import ErrorPageComponent from "components/ErrorPageComponent"

type ErrorPageComponentPropsType = {
  statusCode: number
}

// @ts-ignore
const Error: NextPage = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <ErrorPageComponent statusCode={statusCode} />
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default Error
