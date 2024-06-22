import { useNavigate } from "react-router-dom";
import Board from "../Board/Board";
import "./BoardList.css";

function BoardList({ board, deleteBoard }) {
  const navigate = useNavigate();

  if (!board || board.length === 0) {
    return <div>No boards available</div>;
  }

  return (
    <div className="board-list">
      {board.map((board, index) => (
        <Board
          key={index}
          id={board.id}
          title={board.title}
          img_url={board.img_url}
          category={board.category}
          displayBoard={() => navigate(`boards/${board.id}/cards`)}
          deleteBoard={deleteBoard}
        />
      ))}
    </div>
  );
}

export default BoardList;
