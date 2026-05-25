import { useDispatch, useSelector } from "react-redux";
import styles from "./Task.module.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { deleteTaskId } from "../list/listSlice";
import { useState } from "react";
import { deleteTask } from "./taskSlice";

export default function Task({ taskId, listId }) {
  const task = useSelector((x) => x.tasks).byId[taskId];
  const [showContextMenu, setShowContextMenu] = useState(false);
  const dispatch = useDispatch();
  function handleTaskDeletion() {
    dispatch(deleteTask(taskId));
    dispatch(deleteTaskId({ listId: listId, taskId: taskId }));
  }
  return (
    <div className={styles.task}>
      <div>{task.name}</div>
      <button onClick={() => setShowContextMenu((y) => !y)}>
        <PiDotsThreeBold />
      </button>
      {showContextMenu && (
        <div>
          <button onClick={handleTaskDeletion}>Delete</button>
        </div>
      )}
      {/* <p>{task.description}</p> */}
    </div>
  );
}
