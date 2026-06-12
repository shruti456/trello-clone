import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Board.module.css";
import { useRef, useState } from "react";
import { createBoard } from "./boardSlice";
import CreateForm from "../../components/CreateForm/CreateForm";
import { useClickOutside } from "../../utils/useDeleteOutsideHook";

export default function Board() {
  const boards = useSelector((x) => x.board);
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("");
  const [showCreateBoardForm, setShowCreateBoardForm] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useClickOutside(ref, showCreateBoardForm, () => {
    setShowCreateBoardForm(false);
  });
  function handleAddBoard() {
    setShowCreateBoardForm((f) => !f);
  }
  function handleCreation(e) {
    if (!boardName.trim()) return;
    e.preventDefault();

    dispatch(
      createBoard({ id: crypto.randomUUID(), name: boardName, listIds: [] }),
    );
    setBoardName("");
    setShowCreateBoardForm((f) => !f);
  }
  function handleCancel() {
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
        <CreateForm
          title="Create board"
          onCancel={handleCancel}
          onSubmit={handleCreation}
        >
          <input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Board name"
          />
        </CreateForm>
      )}
    </div>
  );
}
