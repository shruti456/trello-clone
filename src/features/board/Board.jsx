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
      <h3 className={styles.yourBoards}>Your boards</h3>
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
      </div>
      <div>
        <button onClick={handleAddBoard} className={styles.createBoard}>
          Create new board
        </button>
      </div>
      {showCreateBoardForm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Create Board</h2>
            <form onSubmit={handleCreateBoard} className={styles.form}>
              <input
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                placeholder="Board name"
              />
              <div className={styles.actionButtons}>
                <button onClick={handleCancelCreation}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
