import { useDispatch, useSelector } from "react-redux";
import { createList } from "../list/listSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addListIdInBoard } from "./boardSlice";
import List from "../list/List";
import styles from "./Board.module.css";
import Button from "../../components/button/Button";

export default function BoardPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [listName, setListName] = useState("");
  const [showListForm, setShowListForm] = useState("");
  const lists = useSelector((x) => x.lists);
  function handleAddList() {
    if (!listName) return;
    const listId = crypto.randomUUID();
    dispatch(createList({ id: listId, name: listName, taskIds: [] }));
    dispatch(addListIdInBoard({ boardId: params.boardId, listId }));
    setListName("");
    setShowListForm(false);
  }
  return (
    <div>
      BoardPage
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
