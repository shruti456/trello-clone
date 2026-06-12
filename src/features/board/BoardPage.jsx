import { useDispatch, useSelector } from "react-redux";
import { createList } from "../list/listSlice";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addListIdInBoard, deleteBoard } from "./boardSlice";
import List from "../list/List";
import styles from "./BoardPage.module.css";
import Button from "../../components/button/Button";
import { PiDotsThreeBold } from "react-icons/pi";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { useClickOutside } from "../../utils/useDeleteOutsideHook";
import CreateForm from "../../components/CreateForm/CreateForm";
import { DragDropProvider } from "@dnd-kit/react";
import { reorderTask, appendAtBottom } from "../list/listSlice";

export default function BoardPage() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const params = useParams();
  const [listName, setListName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showListForm, setShowListForm] = useState("");
  const lists = useSelector((x) => x.lists);
  const boardName = useSelector((x) => x.board)?.byId[params.boardId]?.name;
  const navigate = useNavigate();
  const boards = useSelector((x) => x.board);
  useClickOutside(ref, () => {
    setShowContextMenu(false);
  });
  function handleAddList() {
    if (!listName) return;
    const listId = crypto.randomUUID();
    dispatch(createList({ id: listId, name: listName, taskIds: [] }));
    dispatch(addListIdInBoard({ boardId: params.boardId, listId }));
    setListName("");
    setShowListForm(false);
  }
  function handleBoardDeletion() {
    dispatch(deleteBoard(params.boardId));
    if (boards?.allIds.length > 0) navigate("/");
  }
  function handleCancel() {
    setListName("");
    setShowListForm(false);
  }

  function onDragEnd(event) {
    console.log("FULL EVENT", event);
    console.log("SOURCE", event.operation.source);
    console.log("TARGET", event.operation.target);
    console.log(event.operation.source.id);
    console.log(event.operation.target?.id);
    const sourceId = event.operation.source.id;
    const targetId = event.operation.target?.id;
    const sourceListId = event.operation.source.data.listId;
    console.log(sourceListId);
    if (!event.operation.target) return;
    if (sourceId === targetId) return;

    if (!lists?.allIds.includes(targetId))
      dispatch(reorderTask({ listId: sourceListId, sourceId, targetId }));
    else
      dispatch(
        appendAtBottom({
          targetListId: targetId,
          sourceListId,
          sourceTaskId: sourceId,
          // targetListId: targetId,
        }),
      );
  }

  return (
    <div>
      <header className={styles.boardHeader}>
        <span>{boardName}</span>
        <div ref={ref} className={styles.contextMenuIcon}>
          <button onClick={() => setShowContextMenu((y) => !y)}>
            <PiDotsThreeBold />
          </button>
          {showContextMenu && (
            <ContextMenu menuItems={["Delete"]} onClick={handleBoardDeletion} />
          )}
        </div>
      </header>

      {showListForm && (
        <CreateForm
          onCancel={handleCancel}
          onSubmit={handleAddList}
          title="Create list"
        >
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Add list name"
          />
        </CreateForm>
      )}
      <DragDropProvider onDragEnd={(event) => onDragEnd(event)}>
        <div className={styles.list}>
          {lists?.allIds.map((listId) => (
            <List key={listId} listItem={lists.byId[listId]} />
          ))}
          {!showListForm && (
            <Button
              type="button"
              variant="primary"
              onClick={() => setShowListForm(true)}
            >
              Add a list
            </Button>
          )}
        </div>
      </DragDropProvider>
    </div>
  );
}
