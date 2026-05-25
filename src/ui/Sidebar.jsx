import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { CiViewBoard } from "react-icons/ci";
import { BiAlarm, BiAtom } from "react-icons/bi";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
        }
        to="/"
      >
        <CiViewBoard />
        Boards
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
        }
        to="/fav"
      >
        <BiAtom />
        Favourites
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.navlink} ${styles.active}` : styles.navlink
        }
        to="/recent"
      >
        <BiAlarm />
        Recents
      </NavLink>
    </div>
  );
}
