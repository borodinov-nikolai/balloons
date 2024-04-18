import Link from "next/link"
import styles from "./Hero.module.scss"

export default function Hero() {
  return (
    <section className={styles.Hero}>
      <div className="container">
        <div className={styles.Inner}>
          <div className={styles.Info}>
            <h1 className={styles.Title}>AirBalloonsUfa</h1>
            <h2 className={styles.PostTitle}>В каждом шарике - любовь!</h2>
          </div>
          <nav className={styles.Navigation}>
            <Link
              href="/balloons?category=birthdays"
              className={`${styles.NavigationButton} button`}
            >
              Идеи для вдохновения
            </Link>
            <Link
              href="#contacts"
              className={`${styles.NavigationButton} button`}
            >
              У вас есть вопросы?
            </Link>
            <Link href="/news" className={`${styles.NavigationButton} button`}>
              Наши новости и статьи
            </Link>
          </nav>
        </div>
      </div>
    </section>
  )
}
