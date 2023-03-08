import Link from "next/link"
import styles from "pages/registration/Registration.module.scss"

export default function CloseButton() {
  return (
    <Link href="/" className={styles.closeBtn}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="close-btn__line"
          x="6.875"
          y="6.09717"
          width="17.8777"
          height="1.80706"
          transform="rotate(45 6.875 6.09717)"
          fill="#D9D9D9"
          stroke="#D9D9D9"
          strokeWidth="0.2"
        />
        <rect
          className="close-btn__line"
          x="19.5164"
          y="7.37494"
          width="17.8777"
          height="1.80706"
          transform="rotate(135 19.5164 7.37494)"
          fill="#D9D9D9"
          stroke="#D9D9D9"
          strokeWidth="0.2"
        />
      </svg>
    </Link>
  )
}
