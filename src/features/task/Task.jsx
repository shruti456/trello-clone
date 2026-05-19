import { useSelector } from "react-redux";
import styles from "./Task.module.css";

export default function Task({ taskId }) {
  const task = useSelector((x) => x.tasks).byId[taskId];
  return (
    <div className={styles.task}>
      <p>{task.name}</p>
      <p>{task.description}</p>
    </div>
  );
}
