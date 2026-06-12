import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../task/taskSlice";
import { addTaskId, deletelist } from "./listSlice";
import Task from "../task/Task";
import styles from "./List.module.css";
import Button from "../../components/button/Button";
import { PiDotsThreeBold } from "react-icons/pi";
import { deleteListId } from "../board/boardSlice";
import { useParams } from "react-router-dom";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { useClickOutside } from "../../utils/useDeleteOutsideHook";
import CreateForm from "../../components/CreateForm/CreateForm";
import { useDraggable, useDroppable } from "@dnd-kit/react";

export default function List({ listItem }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const params = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const dispatch = useDispatch();
  const ref = useRef();
  const { ref: droppableList, isDropTarget } = useDroppable({
    id: listItem.id,
    // data: {listId:}
  });
  const { ref: draggableList } = useDraggable({
    id: listItem.id,
  });
  const combinedRef = (node) => {
    draggableList(node);
    droppableList(node);
  };
  useClickOutside(ref, () => {
    setShowContextMenu(false);
  });

  function handleShowTaskForm() {
    setShowTaskForm(true);
  }
  function handleCancel() {
    setShowTaskForm(false);
    setTaskName("");
    setTaskDesc("");
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
  function handleListDeletion() {
    dispatch(deletelist(listItem.id));
    dispatch(deleteListId({ boardId: params.boardId, listId: listItem.id }));
  }

  return (
    <div className={styles.listItem} ref={draggableList}>
      <header className={styles.header}>
        <h3 className={styles.listHeader}>{listItem.name}</h3>
        <div ref={ref} className={styles.contextMenuIcon}>
          <button onClick={() => setShowContextMenu((y) => !y)}>
            <PiDotsThreeBold />
          </button>
          {showContextMenu && (
            <ContextMenu menuItems={["Delete"]} onClick={handleListDeletion} />
          )}
        </div>
      </header>

      {isDropTarget && <div>OVER LIST {listItem.id}</div>}
      <div ref={droppableList} className={styles.taskContainer}>
        {listItem.taskIds.map((taskId) => (
          <Task key={taskId} taskId={taskId} listId={listItem.id} />
        ))}
      </div>

      {showTaskForm && (
        <CreateForm
          title="Create task"
          onCancel={handleCancel}
          onSubmit={handleAddTask}
        >
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
        </CreateForm>
      )}
      {!showTaskForm && (
        <Button onClick={handleShowTaskForm} type="button" variant="secondary">
          Add a task
        </Button>
      )}
    </div>
    // </DragDropProvider>
  );
}
