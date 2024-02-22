import withStandardLayout from "hoc/withStandardLayout"
import style from "./../Statistics.module.scss"
import { useEffect, useState } from "react"
import axios from "axios"
import translate from "translate"
import { usePathname } from "next/navigation"
import Loader from "components/Loader"
interface NameCount {
  name: string
  count: string[] | number
}
function Statistics(props: any) {
  const [locations, setLocations] = useState<string>("countries")
  const [ages, setAges] = useState<any>({})
  const [genders, setGenders] = useState<any>({})
  const [socials, setSocials] = useState<any>([])
  const [timeSorting, setTimeSorting] = useState("year") // year == for all the time, week& == for two weeks
  const [cities, setCities] = useState<any[]>()
  const [countries, setCountries] = useState<any[]>()
  const [date1, setDate1] = useState<string>("2023-07-20")
  const [date2, setDate2] = useState<string>("")

  const pathname = usePathname()
  const path = pathname.slice(pathname.lastIndexOf("/"))
  const CounterID = 94315322
  /* const CounterID = 29761725 */
  const currentUrl = "https://linkmusic.ru"

  const setAlltime = () => {
    setDate1("2023-07-20")
  }
  const setMonth = () => {
    const monthNum = parseInt(date2.slice(5, 7)) - 1
    const month =
      monthNum < 10
        ? `0${monthNum}`
        : monthNum == 0
          ? "12"
          : monthNum.toString()
    const date = month + date2.slice(7)
    const dateString = date2.slice(0, 5).toString() + date.toString()
    setDate1(dateString)
  }
  useEffect(() => {
    ;(async () => {
      const getDate = async () => {
        const res = await axios.get(
          `https://api-metrika.yandex.net/stat/v1/data?id=94315322&metrics=ym:s:visits`,
          {
            headers: {
              Authorization:
                "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
            },
          }
        )
        setDate2(res.data.query.date2)
      }
      const getCountries = async () => {
        const res = await axios.get(
          `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&id=${CounterID}&metrics=ym:s:visits&dimensions=ym:s:regionCountry&limit=6${
            timeSorting == "year" || timeSorting == "month"
              ? `&date1=${date1}`
              : ""
          }&group=${timeSorting}`,
          {
            headers: {
              Authorization:
                "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
            },
          }
        )
        let countriesArray: any[] = []
        const allCountries = res.data.data
        const formatCountries = async () => {
          allCountries.forEach(async (e: any) => {
            const translateCountry = async (e: any) => {
              const country = await translate(e.dimensions[0].name, "ru")
              return country
            }
            const setData = async (e: any) => {
              const translatedCountry = await translateCountry(e)

              countriesArray.push({
                name: translatedCountry,
                count:
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0],
              })
            }
            await setData(e)
          })
        }
        setCountries([])
        await formatCountries()
        const sorted = countriesArray.sort(
          (a: NameCount, b: NameCount) => +a.count - +b.count
        )
        setCountries(sorted)
      }
      const getCities = async () => {
        const res = await axios
          .get(
            `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&id=${CounterID}&metrics=ym:s:visits&dimensions=ym:s:regionCity&limit=6${
              timeSorting == "year" || timeSorting == "month"
                ? `&date1=${date1}`
                : ""
            }&group=${timeSorting}`,
            {
              headers: {
                Authorization:
                  "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
              },
            }
          )
          .catch((e) => {
            console.log(e)
          })
        const citiesArray: any[] = []
        const allCities = res?.data.data
        const formatCities = async () => {
          allCities.map((e: any) => {
            const translateCity = async (e: any) => {
              const country = await translate(e.dimensions[0].name, "ru")
              return country
            }
            const setData = async (e: any) => {
              const translatedCity = await translateCity(e)
              citiesArray.push({
                name: translatedCity,
                count:
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0],
              })
            }
            setData(e)
          })
        }
        setCities([])
        await formatCities()
        const sorted = citiesArray.sort((a, b) => a.count - b.count)
        await sorted.pop()
        setCities(sorted)
      }
      const getGenders = async () => {
        const res = await axios
          .get(
            `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&metrics=ym:s:visits&dimensions=ym:s:gender&id=${CounterID}${
              timeSorting == "year" || timeSorting == "month"
                ? `&date1=${date1}`
                : ""
            }&group=${timeSorting}`,
            {
              headers: {
                Authorization:
                  "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
              },
            }
            /* `https://api-metrika.yandex.net/stat/v1//* data?metrics=ym:s:visits&dimensions=ym:s:gender&id=29761725&` */
          )
          .catch((e) => console.log(e))
        setGenders({
          male: !res?.data.data[0]
            ? 0
            : timeSorting == "week"
              ? res.data.data[0].metrics[0][1]
              : timeSorting == "day"
                ? res.data.data[0].metrics[0][6]
                : res.data.data[0].metrics[0],
          female: !res?.data.data[1]
            ? 0
            : timeSorting == "week"
              ? res.data.data[1].metrics[0][1]
              : timeSorting == "day"
                ? res.data.data[1].metrics[0][6]
                : res.data.data[1].metrics[0],
        })
      }
      const getAges = async () => {
        const res = await axios.get(
          `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&metrics=ym:s:visits&dimensions=ym:s:ageInterval&id=${CounterID}${
            timeSorting == "year" || timeSorting == "month"
              ? `&date1=${date1}`
              : ""
          }&group=${timeSorting}`,
          {
            headers: {
              Authorization:
                "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
            },
          }
          /* `https://api-metrika.yandex.net/stat/v1/data?metrics=ym:s:visits&dimensions=ym:s:ageInterval&id=${CounterID}` */
        )
        const filterAges = () => {
          let age17 = 0 // Younger than 18
          let age18 = 0 // Age 18‑24
          let age25 = 0 // Age 25‑34
          let age35 = 0 // Age 35‑44
          let age45 = 0 // Age 45-54
          let age55 = 0 // Age 55+
          res.data.data.map((e: any) => {
            if (e.dimensions[0].id == 17) {
              age17 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            } else if (e.dimensions[0].id == 18) {
              age18 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            } else if (e.dimensions[0].id == 25) {
              age25 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            } else if (e.dimensions[0].id == 35) {
              age35 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            } else if (e.dimensions[0].id == 45) {
              age45 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            } else if (e.dimensions[0].id == 55) {
              age55 =
                timeSorting == "week"
                  ? e.metrics[0][1]
                  : timeSorting == "day"
                    ? e.metrics[0][6]
                    : timeSorting == "week&" || timeSorting == "month"
                      ? e.metrics[0][0] + e.metrics[0][1]
                      : e.metrics[0]
            }
          })
          return {
            a17: age17,
            a18: age18,
            a25: age25,
            a35: age35,
            a45: age45,
            a55: age55,
          }
        }
        setAges(filterAges())
      }
      const getSocials = async () => {
        const res = await axios.get(
          `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&metrics=ym:s:visits&dimensions=ym:s:<attribution>SocialNetwork&id=${CounterID}${
            timeSorting == "year" || timeSorting == "month"
              ? `&date1=${date1}`
              : ""
          }&group=${timeSorting}`,
          {
            headers: {
              Authorization:
                "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
            },
          }
        )
        let vk = 0
        let inst = 0
        let fb = 0
        let google = 0
        let yandex = 0
        let yt = 0
        const filterSocials = async () => {
          await res.data.data.map(
            (e: { dimensions: { id: string }[]; metrics: any }) => {
              if (e.dimensions[0].id == "vkontakte") {
                vk =
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0]
              } else if (e.dimensions[0].id == "instagram") {
                inst =
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0]
              } else if (e.dimensions[0].id == "facebook") {
                fb =
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0]
              } else if (e.dimensions[0].id == "youtube") {
                yt =
                  timeSorting == "week"
                    ? e.metrics[0][1]
                    : timeSorting == "day"
                      ? e.metrics[0][6]
                      : timeSorting == "week&" || timeSorting == "month"
                        ? e.metrics[0][0] + e.metrics[0][1]
                        : e.metrics[0]
              }
            }
          )
        }
        const res1 = await axios.get(
          `https://api-metrika.yandex.net/stat/v1/data/bytime?filters=ym:pv:URL=='${currentUrl}${path}'&metrics=ym:s:visits&dimensions=ym:s:<attribution>SearchEngineRoot&id=${CounterID}${
            timeSorting == "year" || timeSorting == "month"
              ? `&date1=${date1}`
              : ""
          }&group=${timeSorting}`,
          {
            headers: {
              Authorization:
                "Bearer y0_AgAEA7qkbq8fAAowRQAAAADn2xuj326ugKWkSRmnGsBEA7S3W6eIfp0",
            },
          }
        )
        const filterSearchEngines = async () => {
          await res1.data.data.map(
            (e: { dimensions: { id: string }[]; metrics: number[] }) => {
              if (e.dimensions[0].id == "google") {
                google = e.metrics[0]
              } else if (e.dimensions[0].id == "yandex") {
                yandex = e.metrics[0]
              } else if (e.dimensions[0].id == "youtube") {
                yt = e.metrics[0]
              }
            }
          )
        }
        await filterSearchEngines()
        await filterSocials()
        let socialsAndSearchEngines = [
          { name: "vk", count: vk },
          { name: "inst", count: inst },
          { name: "fb", count: fb },
          { name: "yandex", count: yandex },
          { name: "yt", count: yt },
          { name: "google", count: google },
        ]
        socialsAndSearchEngines.sort((a, b) => {
          return b.count - a.count
        })
        setSocials(socialsAndSearchEngines)
      }
      await getDate()
      await getSocials()
      await getCountries()
      await getCities()
      await getAges()
      await getGenders()
    })()
  }, [timeSorting])
  return (
    <>
      {!countries || !cities || !genders || !socials || !ages || !date1 ? (
        <Loader />
      ) : (
        <section className="block block-statistics block_first-on-page">
          <svg
            className="vector__bg vector__bg_right-top"
            width="149"
            height="313"
            viewBox="0 0 149 313"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M178.877 25.3372C178.877 25.3372 119.293 26.0007 105.278 85.6469C91.5691 143.983 46.7518 132.345 28.0592 160.622C9.36651 188.898 21.0609 238.524 71.9876 241.084C117.418 243.368 116.981 270.909 126.976 286.209C136.971 301.509 159.729 310.928 159.729 310.928"
              stroke="url(#paint0_linear_850:5785)"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d="M159.191 255.337C159.191 255.337 115.723 218.983 77.0642 217.193C38.4055 215.404 39.7754 187.156 46.4362 177.177C60.2569 156.485 109.65 162.328 120.472 126.486C128.597 99.5463 117.586 58.7156 164.256 48.1189"
              stroke="url(#paint1_linear_850:5785)"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d="M156.252 225.811C156.252 225.811 97.1241 220.069 109.657 194.55C124.005 165.308 142.365 169.66 133.15 126.891C129.847 111.695 139.807 55.2399 171.614 73.72"
              stroke="url(#paint2_linear_850:5785)"
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <defs>
              <linearGradient
                id="paint0_linear_850:5785"
                x1="138.135"
                y1="16.7781"
                x2="79.8647"
                y2="294.15"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3434FF" />
                <stop offset="1" stopColor="#FF6534" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_850:5785"
                x1="138.55"
                y1="42.7187"
                x2="96.6436"
                y2="242.197"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3434FF" />
                <stop offset="1" stopColor="#FF6534" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_850:5785"
                x1="162.075"
                y1="70.1564"
                x2="130.372"
                y2="221.065"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3434FF" />
                <stop offset="1" stopColor="#FF6534" />
              </linearGradient>
            </defs>
          </svg>
          <div className="content">
            <h2 className="statistics__title">Сводка по релизу</h2>
            <div className={style.statistics__sorting}>
              <div
                onClick={() => {
                  setTimeSorting("year")
                  setAlltime()
                }}
                style={{
                  background: timeSorting == "year" ? "#d4aa00" : "",
                  color: timeSorting == "year" ? "#ffffff" : "",
                }}
                className={style.block_statistics__sorting_item}
              >
                Всё время
              </div>
              <div
                style={{
                  background: timeSorting == "day" ? "#d4aa00" : "",
                  color: timeSorting == "day" ? "#ffffff" : "",
                }}
                className={style.block_statistics__sorting_item}
                onClick={() => setTimeSorting("day")}
              >
                24 часа
              </div>
              <div
                style={{
                  background: timeSorting == "week" ? "#d4aa00" : "",
                  color: timeSorting == "week" ? "#ffffff" : "",
                }}
                className={style.block_statistics__sorting_item}
                onClick={() => setTimeSorting("week")}
              >
                7 дней
              </div>
              <div
                style={{
                  background: timeSorting == "week&" ? "#d4aa00" : "",
                  color: timeSorting == "week&" ? "#ffffff" : "",
                }}
                onClick={() => setTimeSorting("week&")}
                className={style.block_statistics__sorting_item}
              >
                14 дней
              </div>
              <div
                style={{
                  background: timeSorting == "month" ? "#d4aa00" : "",
                  color: timeSorting == "month" ? "#ffffff" : "",
                }}
                onClick={() => {
                  setTimeSorting("month")
                  setMonth()
                }}
                className={style.block_statistics__sorting_item}
              >
                30 дней
              </div>
            </div>
            <div className={style.statistics__tablets}>
              <div className={style.statistics__tablet}>
                <div className={style.statistics__tablet__title}>
                  <p>Социальные сети и поисковики</p>
                </div>
                <div className={style.statistics__tablet__main__content}>
                  {socials.map((e: NameCount, index: number) => {
                    return (
                      <div
                        key={index}
                        className={style.statistics__tablet__row}
                      >
                        {e.name == "vk" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_887_4139)">
                                  <path
                                    d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                                    fill="#4D76A1"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13.4707 20.1403H14.5695C14.5695 20.1403 14.9014 20.1038 15.0709 19.9211C15.2269 19.7534 15.2219 19.4385 15.2219 19.4385C15.2219 19.4385 15.2004 17.9641 15.8847 17.7469C16.5593 17.5331 17.4255 19.1719 18.3437 19.8021C19.0379 20.279 19.5655 20.1744 19.5655 20.1744L22.0205 20.1403C22.0205 20.1403 23.3047 20.0611 22.6958 19.0514C22.6459 18.9688 22.3412 18.3045 20.8705 16.9394C19.3312 15.5106 19.5373 15.7417 21.3916 13.2703C22.5209 11.7652 22.9723 10.8463 22.8313 10.4527C22.6968 10.0779 21.8662 10.1769 21.8662 10.1769L19.1021 10.1942C19.1021 10.1942 18.8972 10.1662 18.7452 10.2571C18.5967 10.3461 18.5011 10.5538 18.5011 10.5538C18.5011 10.5538 18.0637 11.7185 17.4802 12.709C16.2493 14.7991 15.7572 14.9094 15.556 14.7796C15.0881 14.4772 15.2049 13.5645 15.2049 12.9161C15.2049 10.8907 15.5121 10.0462 14.6067 9.82755C14.3062 9.75493 14.0851 9.70701 13.3167 9.69928C12.3304 9.68905 11.4956 9.70227 11.023 9.93387C10.7085 10.0878 10.4659 10.431 10.6137 10.4507C10.7964 10.4752 11.2101 10.5623 11.4295 10.861C11.7128 11.2463 11.7028 12.1118 11.7028 12.1118C11.7028 12.1118 11.8655 14.4961 11.3227 14.7924C10.9501 14.9955 10.439 14.5807 9.34167 12.6846C8.7794 11.7133 8.35489 10.6396 8.35489 10.6396C8.35489 10.6396 8.27304 10.439 8.12704 10.3317C7.94985 10.2016 7.70228 10.1602 7.70228 10.1602L5.07563 10.1774C5.07563 10.1774 4.68132 10.1884 4.53657 10.3599C4.4078 10.5124 4.52634 10.8278 4.52634 10.8278C4.52634 10.8278 6.58274 15.6389 8.91117 18.0634C11.0462 20.2862 13.4707 20.1403 13.4707 20.1403Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_887_4139">
                                    <rect width="28" height="28" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              Вконтакте
                            </div>
                          </>
                        ) : e.name == "inst" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_887:4147)">
                                  <path
                                    d="M1.74966 1.90517C-0.450671 4.19067 -0.000337188 6.6185 -0.000337188 13.9942C-0.000337188 20.1192 -1.069 26.2593 4.524 27.7048C6.2705 28.154 21.7452 28.154 23.4893 27.7025C25.818 27.1017 27.7127 25.2128 27.9717 21.9193C28.0078 21.4597 28.0078 6.53683 27.9705 6.06783C27.6952 2.55967 25.5357 0.537833 22.6902 0.128333C22.038 0.0338328 21.9073 0.00583279 18.5613 -5.47051e-07C6.69283 0.00583279 4.09116 -0.522667 1.74966 1.90517V1.90517Z"
                                    fill="url(#paint0_linear_887:4147)"
                                  />
                                  <path
                                    d="M14.0002 6.00771C10.7234 6.00771 7.61177 5.71645 6.42325 8.76431C5.93232 10.0231 6.00361 11.658 6.00361 13.9989C6.00361 16.053 5.93773 17.9836 6.42325 19.2325C7.60907 22.2822 10.746 21.99 13.9984 21.99C17.1362 21.99 20.3715 22.3165 21.5744 19.2325C22.0663 17.9611 21.9941 16.3506 21.9941 13.9989C21.9941 10.8771 22.1664 8.8617 20.6512 7.34859C19.1171 5.81564 17.0423 6.00771 13.9966 6.00771H14.0002ZM13.2837 7.44778C20.1188 7.43696 20.9888 6.6777 20.5086 17.2253C20.3381 20.9557 17.4954 20.5464 14.0011 20.5464C7.62982 20.5464 7.44662 20.3642 7.44662 13.9953C7.44662 7.55238 7.952 7.45139 13.2837 7.44598V7.44778ZM18.2688 8.77423C17.739 8.77423 17.3095 9.20346 17.3095 9.73277C17.3095 10.2621 17.739 10.6913 18.2688 10.6913C18.7985 10.6913 19.2281 10.2621 19.2281 9.73277C19.2281 9.20346 18.7985 8.77423 18.2688 8.77423V8.77423ZM14.0002 9.89508C11.7323 9.89508 9.89406 11.7328 9.89406 13.9989C9.89406 16.2649 11.7323 18.1018 14.0002 18.1018C16.268 18.1018 18.1054 16.2649 18.1054 13.9989C18.1054 11.7328 16.268 9.89508 14.0002 9.89508V9.89508ZM14.0002 11.3352C17.5243 11.3352 17.5288 16.6626 14.0002 16.6626C10.477 16.6626 10.4716 11.3352 14.0002 11.3352Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_887:4147"
                                    x1="1.80335"
                                    y1="26.2116"
                                    x2="27.8264"
                                    y2="3.68897"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="#FFDD55" />
                                    <stop offset="0.5" stopColor="#FF543E" />
                                    <stop offset="1" stopColor="#C837AB" />
                                  </linearGradient>
                                  <clipPath id="clip0_887:4147">
                                    <rect
                                      width="28"
                                      height="28"
                                      rx="14"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              Instagram
                            </div>
                          </>
                        ) : e.name == "fb" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_887_4169)">
                                  <path
                                    d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                                    fill="#3B5998"
                                  />
                                  <path
                                    d="M17.5206 14.548H15.0225V23.7H11.2376V14.548H9.4375V11.3317H11.2376V9.25031C11.2376 7.76192 11.9446 5.43124 15.0562 5.43124L17.8598 5.44297V8.56501H15.8256C15.4919 8.56501 15.0227 8.73172 15.0227 9.44173V11.3347H17.8513L17.5206 14.548Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_887_4169">
                                    <rect width="28" height="28" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              Facebook
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {socials.fb}
                            </div>
                          </>
                        ) : e.name == "yt" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_887_4193)">
                                  <path
                                    d="M14 28.0001C21.732 28.0001 28.0001 21.732 28.0001 14C28.0001 6.26803 21.732 0 14 0C6.26803 0 0 6.26803 0 14C0 21.732 6.26803 28.0001 14 28.0001Z"
                                    fill="#D42428"
                                  />
                                  <path
                                    d="M23.8979 4.099C29.3653 9.56683 29.3658 18.4315 23.8979 23.8993C18.4306 29.3667 9.56548 29.3669 4.09766 23.8993L23.8979 4.099Z"
                                    fill="#CC202D"
                                  />
                                  <path
                                    d="M21.3244 11.2984C21.3244 10.1248 20.3736 9.17352 19.2006 9.17352H9.23663C8.06388 9.17352 7.11328 10.125 7.11328 11.2984V16.9963C7.11328 18.17 8.06406 19.1212 9.23663 19.1212H19.2005C20.3737 19.1212 21.3242 18.1697 21.3242 16.9963V11.2984H21.3244ZM12.7973 16.5511V11.1994L16.8558 13.8754L12.7973 16.5511Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_887_4193">
                                    <rect width="28" height="28" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              YouTube
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {socials.yt}
                            </div>
                          </>
                        ) : e.name == "yandex" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="14" cy="14" r="14" fill="#D7143A" />
                                <path
                                  d="M16.9416 7H14.9525C12.9373 7 10.9039 8.4881 10.9039 11.8127C10.9039 13.5347 11.6337 14.8759 12.9716 15.6387L10.5229 20.0708C10.4068 20.2804 10.4037 20.518 10.5147 20.7063C10.6231 20.8902 10.8213 21 11.0446 21H12.2833C12.5647 21 12.7841 20.864 12.8893 20.6257L15.1852 16.135H15.3528V20.4403C15.3528 20.7437 15.6088 21 15.9119 21H16.994C17.3338 21 17.5711 20.7627 17.5711 20.4229V7.61258C17.5711 7.25192 17.3123 7 16.9416 7ZM15.3528 14.1402H15.0572C13.9111 14.1402 13.2269 13.2046 13.2269 11.6376C13.2269 9.68909 14.0912 8.99486 14.9001 8.99486H15.3528V14.1402Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              Яндекс
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {socials.yandex}
                            </div>
                          </>
                        ) : e.name == "google" ? (
                          <>
                            <div className={style.statistics__tablet__img}>
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="14" cy="14" r="14" fill="white" />
                                <g clip-path="url(#clip0_887_4245)">
                                  <path
                                    d="M8.98918 15.8776L8.36263 18.2166L6.07258 18.2651C5.3882 16.9957 5 15.5434 5 14C5 12.5076 5.36295 11.1002 6.00631 9.86099H6.0068L8.04559 10.2348L8.9387 12.2613C8.75177 12.8063 8.64989 13.3913 8.64989 14C8.64996 14.6607 8.76963 15.2937 8.98918 15.8776Z"
                                    fill="#FBBB00"
                                  />
                                  <path
                                    d="M22.8402 12.3187C22.9436 12.8631 22.9975 13.4254 22.9975 14C22.9975 14.6444 22.9297 15.2729 22.8007 15.8791C22.3625 17.9422 21.2177 19.7437 19.6319 21.0185L19.6314 21.018L17.0634 20.887L16.7 18.6182C17.7523 18.0011 18.5747 17.0353 19.0079 15.8791H14.1953V12.3187H19.0781H22.8402Z"
                                    fill="#518EF8"
                                  />
                                  <path
                                    d="M19.6355 21.018L19.636 21.0185C18.0937 22.2582 16.1344 23 14.0016 23C10.5742 23 7.59434 21.0843 6.07422 18.2651L8.99082 15.8777C9.75086 17.9061 11.7076 19.3501 14.0016 19.3501C14.9877 19.3501 15.9114 19.0835 16.7041 18.6182L19.6355 21.018Z"
                                    fill="#28B446"
                                  />
                                  <path
                                    d="M19.7462 7.07197L16.8306 9.45894C16.0102 8.94615 15.0404 8.64992 14.0015 8.64992C11.6556 8.64992 9.6622 10.1601 8.94023 12.2613L6.0083 9.86098H6.00781C7.50568 6.97307 10.5231 5 14.0015 5C16.1852 5 18.1875 5.77787 19.7462 7.07197Z"
                                    fill="#F14336"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_887_4245">
                                    <rect
                                      width="18"
                                      height="18"
                                      fill="white"
                                      transform="translate(5 5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className={style.statistics__tablet__name}>
                              Google
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {socials.google}
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        <div className={style.statistics_tablet__number}>
                          {typeof e.count === "number"
                            ? e.count
                            : e.count[1] || e.count[0]}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={style.statistics__tablet}>
                <div
                  className={`${style.statistics__tablet__title} ${style.statistics_tablet__title_sorting}`}
                >
                  <p>Переходов из стран и городов</p>
                  <div className={style.statistics__tablet__sorting}>
                    <div
                      onClick={() => setLocations("countries")}
                      className={style.statistics__tablet__sorting__item}
                      style={{
                        borderBottom:
                          locations == "countries" ? "2px solid #d4aa00" : "",
                        color: locations == "countries" ? "#d4aa00" : "",
                        opacity: locations == "countries" ? 1 : "",
                      }}
                    >
                      Страны
                    </div>
                    <div
                      style={{
                        borderBottom:
                          locations == "cities" ? "2px solid #d4aa00" : "",
                        color: locations == "cities" ? "#d4aa00" : "",
                        opacity: locations == "cities" ? 1 : "",
                      }}
                      onClick={() => setLocations("cities")}
                      className={style.statistics__tablet__sorting__item}
                    >
                      Города
                    </div>
                  </div>
                </div>
                <div className={style.statistics__tablet__main__content}>
                  {locations == "countries" ? (
                    <>
                      {countries?.map((e, index) => {
                        return (
                          <div
                            key={index}
                            className={style.statistics__tablet__row}
                          >
                            <div className={style.statistics__tablet__name}>
                              {e.name}
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {typeof e.count === "number"
                                ? e.count
                                : e.count[1] || e.count[0]}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      {cities?.map((e, index) => {
                        return (
                          <div
                            key={index}
                            className={style.statistics__tablet__row}
                          >
                            <div className={style.statistics__tablet__name}>
                              {e.name}
                            </div>
                            <div className={style.statistics_tablet__number}>
                              {typeof e.count === "number"
                                ? e.count
                                : e.count[1] || e.count[0]}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>

              {/*               <div
                style={{ height: "50%" }}
                className={style.statistics__tablet}
              >
                <div className={style.statistics__tablet__title}>
                  <p>Пол</p>
                </div>
                <div className={style.statistics__tablet__content}>
                  <div
                    className={`${style.statistics__tablet__column} ${style.statistics__tablet__column_blue}`}
                  >
                    <CountUp end={genders.male} duration={1} />
                    <p>Мужчины</p>
                  </div>
                  <div
                    className={`${style.statistics__tablet__column} ${style.statistics__tablet__column_orange}`}
                  >
                    <CountUp end={genders.female} duration={1} />
                    <p>Женщины</p>
                  </div>
                </div>
              </div> */}

              {/*               <div className={style.statistics__tablet}>
                <div className={style.statistics__tablet__title}>
                  <p>Возраст</p>
                </div>
                <div className="statistics__tablet__main-content">
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      меньше 18 лет
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a17}
                    </div>
                  </div>
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      18 ‑ 24 года
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a18}
                    </div>
                  </div>
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      25 - 34 года
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a25}
                    </div>
                  </div>
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      35 - 44 года
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a25}
                    </div>
                  </div>
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      45 - 54 года
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a25}
                    </div>
                  </div>
                  <div className={style.statistics__tablet__row}>
                    <div className={style.statistics__tablet__name}>
                      55+ лет
                    </div>
                    <div className={style.statistics_tablet__number}>
                      {ages.a25}
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default withStandardLayout(Statistics)
