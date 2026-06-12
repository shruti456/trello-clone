import { useDispatch, useSelector } from "react-redux";
import styles from "./Task.module.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { deleteTaskId } from "../list/listSlice";
import { useRef, useState } from "react";
import { deleteTask } from "./taskSlice";
import { useClickOutside } from "../../utils/useDeleteOutsideHook";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { useDraggable, useDroppable } from "@dnd-kit/react";

export default function Task({ taskId, listId }) {
  const task = useSelector((x) => x.tasks).byId[taskId];
  const ref = useRef();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const dispatch = useDispatch();
  const { ref: draggableRef } = useDraggable({
    id: taskId,
    data: { listId },
  });
  const { ref: droppableRef } = useDroppable({
    id: taskId,
  });
  const combinedRef = (node) => {
    draggableRef(node);
    droppableRef(node);
  };
  useClickOutside(ref, () => {
    setShowContextMenu(false);
  });
  function handleTaskDeletion() {
    dispatch(deleteTask(taskId));
    dispatch(deleteTaskId({ listId: listId, taskId: taskId }));
  }
  return (
    <div ref={combinedRef} className={styles.task}>
      <div>{task?.name}</div>
      <div ref={ref} className={styles.contextMenuIcon}>
        <button onClick={() => setShowContextMenu((y) => !y)}>
          <PiDotsThreeBold />
        </button>
        {showContextMenu && (
          <ContextMenu menuItems={["Delete"]} onClick={handleTaskDeletion} />
        )}
      </div>

      {/* <p>{task.description}</p> */}
    </div>
  );
}
