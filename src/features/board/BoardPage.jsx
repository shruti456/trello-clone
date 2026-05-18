import { useDispatch, useSelector } from "react-redux";
import { createList } from "../list/listSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addListIdInBoard } from "./boardSlice";
import List from "../list/List";

export default function BoardPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [listName, setListName] = useState("");
  const [showListForm, setShowListForm] = useState("");
  const lists = useSelector((x) => x.lists);
  function handleAddList() {
    const listId = crypto.randomUUID();
    dispatch(createList({ id: listId, name: listName, taskIds: [] }));
    dispatch(addListIdInBoard({ boardId: params.boardId, listId }));
  }
  return (
    <div>
      BoardPage
      {!showListForm && (
        <button onClick={() => setShowListForm((s) => !s)}>Add a list</button>
      )}
      {showListForm && (
        <div>
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Add board name"
          />
          <button onClick={handleAddList}>Add a list</button>
        </div>
      )}
      {lists?.allIds.map((listId) => (
        <List key={listId} listItem={lists.byId[listId]} />
      ))}
    </div>
  );
}
