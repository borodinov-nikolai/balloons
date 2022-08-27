import { SyntheticEvent, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./Header.module.scss"
import login from "./images/login.svg"
import burger from "./images/burger.svg"
import Logo from "components/Logo"
import { Fade, Grid, Popper } from "@mui/material"
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded"
import { useRouter } from "next/router"
import { ClickAwayListener } from "@mui/base"
import { useAuth } from "context/AuthProvider"

function Header() {
  const [hasBg, toggleBg] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const headerClasses = hasBg
    ? `${styles.header} ${styles.header_bg}`
    : styles.header
  const burgerClasses = openMenu
    ? `${styles.burger} ${styles.active}`
    : styles.burger
  const menuClasses = openMenu ? `${styles.list} ${styles.active}` : styles.list
  const { user, isAuthenticated, logout } = useAuth()

  const addBg = () => {
    !(window.scrollY < 50) ? toggleBg(true) : toggleBg(false)
  }

  const userMenuHandler = (e: SyntheticEvent) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
  }

  const logoutHandler = async () => {
    await logout()
  }

  useEffect(() => {
    addBg()
    window.addEventListener("scroll", addBg)
    return () => {
      window.removeEventListener("scroll", addBg)
    }
  }, [])

  const UserProfileBtn = () => {
    return (
      <>
        {isAuthenticated && !user?.avatar && (
          <AssignmentIndRoundedIcon style={{ color: "#0000FF" }} />
        )}

        {isAuthenticated && !!user?.avatar?.url && (
          <Image
            className={styles.personalAreaButton}
            src={user.avatar.url}
            width={43}
            height={43}
            alt=""
          />
        )}

        {!isAuthenticated && (
          <Image
            className={styles.personalAreaButton}
            src={login}
            width={43}
            height={43}
            alt=""
          />
        )}
      </>
    )
  }

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <header className={headerClasses}>
        <nav className={styles.mainMenu}>
          <Logo />

          <div className={menuClasses}>
            <Link href={{ pathname: "/", hash: "#services" }}>
              <a
                className={
                  router.asPath == "/#services"
                    ? `${styles.listItem} ${styles.active}`
                    : styles.listItem
                }
                onClick={() => setOpenMenu(false)}
              >
                Услуги
              </a>
            </Link>

            <Link href={"/artists"}>
              <a
                onClick={() => setOpenMenu(false)}
                className={
                  router.asPath == "/artists"
                    ? `${styles.listItem} ${styles.active}`
                    : styles.listItem
                }
              >
                Артисты
              </a>
            </Link>

            <Link href={"/releases"}>
              <a
                onClick={() => setOpenMenu(false)}
                className={
                  router.asPath == "/releases"
                    ? `${styles.listItem} ${styles.active}`
                    : styles.listItem
                }
              >
                Релизы
              </a>
            </Link>

            <Link
              href={{
                pathname: "/",
                hash: "#contacts",
              }}
              scroll
            >
              <a
                onClick={() => setOpenMenu(false)}
                className={
                  router.asPath == "/#contacts"
                    ? `${styles.listItem} ${styles.active}`
                    : styles.listItem
                }
              >
                Контакты
              </a>
            </Link>

            <div className={styles.listCircle}>
              <svg
                width="380"
                height="380"
                viewBox="0 0 380 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="190"
                  cy="190"
                  r="125"
                  stroke="#0000FF"
                  strokeWidth="130"
                />
                <mask
                  id="mask0_925:543"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="380"
                  height="380"
                >
                  <circle
                    cx="190"
                    cy="190"
                    r="125"
                    stroke="white"
                    strokeWidth="130"
                  />
                </mask>
                <g mask="url(#mask0_925:543)">
                  <path
                    d="M376.371 -128.316C376.371 -128.316 303.58 -122.84 292.508 -52.6439C281.678 16.0109 225.692 6.07159 205.711 40.3013C185.729 74.531 205.076 131.09 267.609 130.031C323.392 129.087 325.659 161.023 339.437 177.955C353.215 194.887 382.001 204 382.001 204"
                    stroke="#FC6338"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M379.999 137C379.999 137 320.728 98.3397 271.467 99.0048C222.207 99.6698 220.751 67.1584 228.075 55.2392C243.274 30.5226 306.615 33.7541 316.294 -8.13629C323.559 -39.621 304.97 -85.7007 362.995 -101.142"
                    stroke="#FC6338"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M372.102 102.233C372.102 102.233 287.017 98.5309 301.138 68.6351C317.3 34.3779 344.096 38.4755 324.705 -10.1541C317.775 -27.431 323.701 -92.7022 371.724 -73.0487"
                    stroke="#FC6338"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M-31.9997 18.8711C-31.9997 18.8711 4.75302 54.4082 50.3981 27.513C101.565 -2.63716 144.744 38.1296 144.688 77.6088C144.631 117.088 93.5875 134.494 117.644 200.013C142.241 267.002 84.7209 305.835 84.7209 305.835"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M-26.9598 74.6975C-26.9598 74.6975 22.0274 77.0354 60.7701 53.999C99.5128 30.9627 116.285 59.3121 116.203 73.2855C116.024 102.267 64.2442 128.241 76.6915 170.033C86.0555 201.439 122.932 234.091 84.3371 274.307"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M-0.451557 87.5896C-0.451557 87.5896 39.4178 64.0602 43.5849 96.9094C48.3721 134.544 27.7277 142.078 64.1009 177.765C77.0524 190.426 103.549 251.713 60.7717 254.127"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M-124.882 77.8946C-124.882 77.8946 -108.333 126.266 -152.077 156.154C-201.114 189.657 -182.563 246.067 -146.802 262.795C-111.042 279.522 -73.593 240.714 -24.509 290.334C25.6755 341.07 85.2726 305.506 85.2726 305.506"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M-108.626 152.072C-108.626 152.072 -108.93 201.114 -134.02 238.56C-159.11 276.005 -131.705 294.28 -117.747 294.951C-88.7987 296.333 -60.0734 246.027 -19.0121 260.708C11.8441 271.75 42.462 310.331 84.6985 273.959"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M24.5539 428.141C24.5539 428.141 -21.7329 427.288 -8.06814 397.127C7.57593 362.565 30.9267 366.966 18.6485 317.511C14.2525 299.94 23.8015 233.858 61.4994 254.218"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </g>
              </svg>
            </div>
          </div>

          <button className={burgerClasses} onClick={() => setOpenMenu(!open)}>
            <Image src={burger} width={50} height={50} alt="" />
          </button>

          {isAuthenticated ? (
            <>
              <Grid onClick={userMenuHandler} style={{ cursor: "pointer" }}>
                <UserProfileBtn />
              </Grid>

              <Popper
                open={open}
                anchorEl={anchorEl}
                className={styles.user_popper}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} in={open} timeout={350}>
                    <div>
                      <Grid className={styles.popper_item}>
                        <Link
                          passHref
                          href={
                            user?.slug ? `/artist/${user?.slug}` : "/artist/new"
                          }
                        >
                          <a>Профиль</a>
                        </Link>
                      </Grid>

                      <Grid
                        className={styles.popper_item}
                        onClick={logoutHandler}
                      >
                        Выйти
                      </Grid>
                    </div>
                  </Fade>
                )}
              </Popper>
            </>
          ) : (
            <Link passHref href={"/login"}>
              <a>
                <Image
                  className={styles.personalAreaButton}
                  src={login}
                  alt=""
                />
              </a>
            </Link>
          )}
        </nav>
      </header>
    </ClickAwayListener>
  )
}

export default Header
