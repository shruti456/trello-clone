import styles from "./Button.module.css";

export default function Button({ children, onClick, type, variant }) {
  return (
    <button type={type} onClick={onClick} className={styles[variant]}>
      {children}
    </button>
  );
}
