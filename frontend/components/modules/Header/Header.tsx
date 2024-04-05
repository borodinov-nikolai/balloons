"use client"
import styles from "./Header.module.scss"
import { usePathname } from "next/navigation"
import Contacts from "../Contacts/Contacts"
import Logo from "components/elements/Logo/Logo"

export default function Header() {
  const pathname = usePathname()

  return (
    <header
      className={styles.Header}
      style={{ position: pathname === "/" ? "absolute" : "relative" }}
    >
      <div className="container">
        <div className={styles.Inner}>
          <Logo />
          <Contacts />
        </div>
      </div>
    </header>
  )
}
