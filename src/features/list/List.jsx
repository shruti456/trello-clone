import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../task/taskSlice";
import { addTaskId } from "./listSlice";
import Task from "../task/Task";
import styles from "./List.module.css";
import Button from "../../components/button/Button";

export default function List({ listItem }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const dispatch = useDispatch();
  function handleShowTaskForm() {
    setShowTaskForm(true);
  }

  function handleAddTask(e) {
    e.preventDefault();
    const taskId = crypto.randomUUID();
    dispatch(
      createTask({
        id: taskId,
        name: taskName,
        description: taskDesc,
      }),
    );
    dispatch(addTaskId({ listId: listItem.id, taskId: taskId }));

    setShowTaskForm(false);
    setTaskName("");
    setTaskDesc("");
  }
  return (
    <div className={styles.listItem}>
      <h3 className={styles.listHeader}>{listItem.name}</h3>
      {showTaskForm && (
        <form>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
          />
          <input
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            placeholder="Task Description"
          />
          <Button
            onClick={(e) => handleAddTask(e)}
            type="button"
            variant="primary"
          >
            Add task
          </Button>
        </form>
      )}

      {listItem.taskIds.map((taskId) => (
        <Task key={taskId} taskId={taskId} />
      ))}
      {!showTaskForm && (
        <Button onClick={handleShowTaskForm} type="button" variant="secondary">
          Add a task
        </Button>
      )}
    </div>
  );
}
