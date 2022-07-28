import qs from "qs"

const getQueryStr = (url: string, params: object) => {
  return `${url}?${qs.stringify(params)}`
}

export default getQueryStr
