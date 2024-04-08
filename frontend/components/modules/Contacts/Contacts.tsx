import styles from "./Contacts.module.scss"
import InstagramIcon from "./icons/InstagramIcon"
import WhatsAppIcon from "./icons/WhatsAppIcon"

export default function Contacts() {
  return (
    <ul className={styles.ContactList}>
      <li className={styles.ContactListItem}>
        <a
          href="http://instagram.com/AirBalloonUfa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </li>
      <li className={styles.ContactListItem}>
        <a
          href="https://wa.me/79659338808"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
        </a>
        <div>
          <a
            href="https://wa.me/79659338808"
            target="_blank"
            rel="noopener noreferrer"
          >
            +7 965 933 88 08
          </a>
          <a
            href="https://wa.me/79378441600"
            target="_blank"
            rel="noopener noreferrer"
          >
            +7 937 844 16 00
          </a>
        </div>
      </li>
    </ul>
  )
}
