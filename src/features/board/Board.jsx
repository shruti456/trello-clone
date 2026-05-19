import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import { useState } from "react";
import { createBoard } from "./boardSlice";

export default function Board() {
  const boards = useSelector((x) => x.board);
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false);
  const dispatch = useDispatch();

  function handleAddBoard() {
    setShowCreateBoardForm((f) => !f);
  }
  function handleCreateBoard(e) {
    if (!boardName.trim()) return;
    e.preventDefault();

    dispatch(
      createBoard({ id: crypto.randomUUID(), name: boardName, listIds: [] }),
    );
    setBoardName("");
    setShowCreateBoardForm((f) => !f);
  }
  function handleCancelCreation() {
    setShowCreateBoardForm(false);
    setBoardName("");
  }
  function hanldeGoToBoard(id) {
    navigate(`/board/${id}`);
  }
  return (
    <div>
      <h3>Your boards</h3>
      <div className={styles.boards}>
        {boards.allIds.map((id) => {
          return (
            <div
              key={id}
              onClick={() => hanldeGoToBoard(id)}
              className={styles.boardItem}
            >
              {boards.byId[id].name}
            </div>
          );
        })}
        <div>
          <button onClick={handleAddBoard} className={styles.createBoard}>
            Create new board
          </button>
        </div>
      </div>
      {showCreateBoardForm && (
        <form onSubmit={handleCreateBoard}>
          <input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Add board name"
          />
          <button onClick={handleCancelCreation}>Cancel</button>
          <button type="submit">Create</button>
        </form>
      )}
    </div>
  );
}
