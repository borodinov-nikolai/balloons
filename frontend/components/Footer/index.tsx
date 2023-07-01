import React, { useState } from "react"
import SocialLinks from "components/SocialLinks"
import styles from "./Footer.module.scss"
import { UserSocialLinksType } from "types/general"
import Link from "next/link"

type FooterProps = {
  links: UserSocialLinksType
}

const Footer = ({ links }: FooterProps) => {
  const [year] = useState(new Date().getFullYear())
  return (
    <div className={`${styles.blockFooter}`}>
      <div className="vector__bg vector__footer">
        <svg
          width="218"
          height="313"
          viewBox="0 0 218 313"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.1227 25.3372C39.1227 25.3372 98.7065 26.0007 112.722 85.647C126.431 143.983 171.248 132.345 189.941 160.622C208.633 188.898 196.939 238.524 146.012 241.084C100.582 243.368 101.019 270.909 91.0239 286.209C81.0285 301.509 58.2707 310.928 58.2707 310.928"
            stroke="url(#paint0_linear_850:5773)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M58.809 255.337C58.809 255.337 102.277 218.983 140.936 217.193C179.594 215.404 178.225 187.156 171.564 177.177C157.743 156.485 108.35 162.328 97.5285 126.486C89.4034 99.5463 100.414 58.7157 53.7444 48.1189"
            stroke="url(#paint1_linear_850:5773)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <path
            d="M61.7456 225.811C61.7456 225.811 120.874 220.069 108.341 194.55C93.9927 165.308 75.6327 169.66 84.8483 126.891C88.1514 111.695 78.1912 55.2399 46.3839 73.7199"
            stroke="url(#paint2_linear_850:5773)"
            strokeWidth="3"
            strokeMiterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_850:5773"
              x1="79.8646"
              y1="16.7781"
              x2="138.135"
              y2="294.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_850:5773"
              x1="79.4497"
              y1="42.7187"
              x2="121.356"
              y2="242.197"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_850:5773"
              x1="55.9232"
              y1="70.1564"
              x2="87.6263"
              y2="221.065"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3434FF" />
              <stop offset="1" stopColor="#FF6534" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="content">
        <div className={styles.row}>
          <div className={styles.column__text}>
            <p>Copyright © {year} ООО «Линк Мьюзик»</p>
            <p>
              Правовая информация:{" "}
              <Link href="/terms">Пользовательское соглашение</Link>,{" "}
              <Link href="/privacy-policy">Политика конфиденциальности</Link>
            </p>
          </div>
          <div>
            <SocialLinks
              color="darkGray"
              links={links}
              sx={{ flexWrap: "nowrap" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
