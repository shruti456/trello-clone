import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../task/taskSlice";
import { addTaskId } from "./listSlice";
import Task from "../task/Task";

export default function List({ listItem }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const dispatch = useDispatch();
  function handleShowTaskForm() {
    setShowTaskForm((x) => !x);
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
  }
  return (
    <div>
      <h3>{listItem.name}</h3>
      {!showTaskForm && (
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
          <button onClick={(e) => handleAddTask(e)}>Add task</button>
        </form>
      )}
      {showTaskForm && <button onClick={handleShowTaskForm}>Add a task</button>}
      {listItem.taskIds.map((taskId) => (
        <Task key={taskId} taskId={taskId} />
      ))}
    </div>
  );
}
