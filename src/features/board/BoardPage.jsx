import { useDispatch, useSelector } from "react-redux";
import { createList } from "../list/listSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addListIdInBoard, deleteBoard } from "./boardSlice";
import List from "../list/List";
import styles from "./BoardPage.module.css";
import Button from "../../components/button/Button";
import { PiDotsThreeBold } from "react-icons/pi";

export default function BoardPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [listName, setListName] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showListForm, setShowListForm] = useState("");
  const lists = useSelector((x) => x.lists);
  const boardName = useSelector((x) => x.board)?.byId[params.boardId]?.name;
  const navigate = useNavigate();
  const boards = useSelector((x) => x.board);
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
  return (
    <div>
      <header className={styles.boardHeader}>
        <span>{boardName}</span>
        <button onClick={() => setShowContextMenu((y) => !y)}>
          <PiDotsThreeBold />
        </button>
      </header>
      {showContextMenu && (
        <div>
          <button onClick={handleBoardDeletion}>Delete board</button>
        </div>
      )}
      {showListForm && (
        <div>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Add list name"
          />
          <Button onClick={handleAddList}>Add list</Button>
        </div>
      )}
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
    </div>
  );
}
