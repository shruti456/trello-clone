import styles from "./ContextMenu.module.css";
export default function ContextMenu({ menuItems, onClick }) {
  return (
    <ul className={styles.menu}>
      {menuItems?.map((x, i) => (
        <li key={i} className={styles.menuItem} onClick={onClick}>
          {x}
        </li>
      ))}
    </ul>
  );
}
