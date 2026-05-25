import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FaTrello } from "react-icons/fa";
export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <FaTrello />
        Trello
      </Link>
    </header>
  );
}
