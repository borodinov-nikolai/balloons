import Link from "next/link"
import styles from "./Logo.module.scss"

function Logo() {
  return (
    <Link passHref href="/" className={styles.logo}>
      <svg viewBox="0 0 411 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.logo__lines}>
          <path d="M157.73 102.34H148.1V62.64H157.73V102.34Z" fill="#D4AA03" />
          <path d="M164.35 38.41H174.43V102.2H164.35V38.41Z" fill="#D5AE0D" />
          <path
            d="M190.7 102.17H181V49.17H190.73L190.7 102.17Z"
            fill="#D3A900"
          />
          <path d="M207.37 102.35H197.37V18.28H207.37V102.35Z" fill="#D5AD0C" />
        </g>
        <path
          d="M214.93 2.50999C247.77 2.83999 289.37 10.77 327.71 32.08C333.745 35.5991 339.596 39.4241 345.24 43.54C345.24 43.54 348 45.5 347 47.54C346 49 342.64 47.04 342.64 47.04C294.77 13.66 240.88 4.51999 184 7.88999C150.77 9.88999 118.89 17.5 89.21 32.89C80.68 37.31 64.6 48.04 64.6 48.04C64.6 48.04 60.5 50.4333 59.5 49.26C58 47.5 61.86 44.62 61.86 44.62C82.34 28.88 105.58 18.85 130.33 12.07C154.55 5.43998 179.27 2.43999 214.93 2.50999Z"
          fill="#0D0DFE"
        />
        <path
          d="M214 97.03H219C272.493 97.03 325.983 97.0633 379.47 97.13C381.58 97.13 384 97.5 384 99.5C384 101.5 381.62 101.7 379.53 101.7C325.703 101.833 267.82 102.047 214 102C214 102 214 102 214 97.03Z"
          fill="#1919FE"
        />
        <path
          d="M241.1 78.28C244.46 71.68 247.2 66 250.25 60.48C251.03 59.07 251.5 57.07 254.06 57.07C256.5 57.07 256.58 59.68 256.99 61.22C259.13 69.22 260.99 77.31 263.04 85.75L257.56 86.02C256.23 79.77 254.92 73.68 253.32 66.2C250.19 72.2 247.7 77.36 244.89 82.28C244.01 83.81 242.37 85.55 240.83 85.83C239.83 86.01 238.09 83.83 237.28 82.4C234.54 77.54 232.07 72.53 228.83 66.3C227.26 73.58 225.98 79.48 224.65 85.66H219.14C221.14 77.15 223.38 68.81 225.5 60.5C226 59 226.962 57.32 227.83 57.32C228.83 57.32 229.356 57.5534 230 58C230.721 58.5 231.086 59.1932 231.48 59.85C234.68 65.6 237.6 71.51 241.1 78.28Z"
          fill="#0C0CFE"
        />
        <path
          d="M141 97C141 100.97 141 102 141 102C105.9 101.92 67.1 102.16 32 102C32 102 29.5 102 29.5 99.5C29.5 97 32 97 32 97C68.25 96.89 104.4 97 141 97Z"
          fill="#1A1AFE"
        />
        <path
          d="M334.86 57.39V61.9C334.368 62.0729 333.858 62.1903 333.34 62.25C327.51 62.25 320.5 62.42 315.87 62.42C313.95 62.54 310.26 62.42 310.26 65.14C310.26 66.2342 310.63 67.78 312.5 68C316.28 68.44 323.27 67.92 327.1 68.09C333 68.32 336.99 72.21 336.8 77.33C336.62 82.33 332.85 85.73 326.98 85.86C319.98 86.01 312.98 85.86 305.63 85.86C305.46 84.32 305.3 82.94 305.14 81.56C305.654 81.2787 306.207 81.0732 306.78 80.95C312.78 80.9 318.78 80.95 324.78 80.87C327.91 80.87 332 81.32 331.91 76.87C331.82 72.42 327.64 73.18 324.58 73.12C320.92 73.04 317.25 73.19 313.58 73.12C308.16 72.94 304.96 70.12 304.81 65.57C304.66 61.02 307.65 57.69 313.01 57.49C320.12 57.19 327.27 57.39 334.86 57.39Z"
          fill="#0E0EFE"
        />
        <path
          d="M76.92 86.37H71.83V85.31C71.83 77.5 71.73 69.68 71.83 61.87C71.83 60.68 71.83 58.6911 73.04 58.33C74.5 58 75.97 58.96 76.87 59.85C82.62 65.5 88.22 71.32 94.87 78.12V58.29H99.87C99.87 66.66 99.92 74.78 99.87 82.89C99.87 84.1 99.5 86 98.76 86.5C98 87 95.83 85.92 94.91 85.05C90.1 80.46 85.47 75.68 80.76 70.98C79.76 69.98 78.67 68.98 76.92 67.37V86.37Z"
          fill="#1212FE"
        />
        <path
          d="M269 57.55L273.91 57.6108V59.07C273.91 63.89 273.91 68.71 273.96 73.53C273.96 77.44 275.96 79.91 279.74 80.41C282.692 80.8247 285.682 80.8952 288.65 80.62C293.09 80.16 295.37 77.52 295.28 72.88C295.17 67.93 295.28 62.97 295.28 57.63H300C300 64.14 300.1 70.04 300.1 76.16C300.089 76.6613 300.011 77.1589 299.87 77.64C298.11 83.96 291.41 86.86 281.03 85.81C273.52 85.05 269.4 81.47 269.09 74.9C268.78 69.28 269 63.64 269 57.55Z"
          fill="#1111FE"
        />
        <path
          d="M382.93 80.91V85.71C376.74 85.71 370.6 86.19 364.56 85.59C357.24 84.85 352.65 78.51 352.86 70.69C353.06 63.38 357.69 58.27 365.22 57.56C369.34 57.17 373.52 57.39 377.67 57.35C379.31 57.35 380.95 57.35 382.83 57.35V62.3C377.83 62.3 373.02 62.2 368.21 62.3C361.43 62.47 357.83 65.85 357.88 71.78C357.93 77.71 361.56 80.78 368.48 80.88C373.12 80.95 377.76 80.91 382.93 80.91Z"
          fill="#0D0DFE"
        />
        <path
          d="M31.14 58.23H35.72V81.48H55.06V86.16H31.14V58.23Z"
          fill="#0707FE"
        />
        <path
          d="M113.5 70.5L128 58L134 58L118.56 72.51C123.82 76.93 128.88 81.72 134 86H128L113.5 74L113.5 72.5L113.5 70.5Z"
          fill="#1212FE"
        />
        <path d="M112 58V86H107V58H112Z" fill="#1D1DFE" />
        <path
          d="M346.5 85.92H342.15V57.68H346.57L346.5 85.92Z"
          fill="#1111FE"
        />
        <path d="M64.51 86.25H60V57.97H64.51V86.25Z" fill="#1111FE" />
      </svg>
    </Link>
  )
}

export default Logo
