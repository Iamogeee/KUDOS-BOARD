import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardDetail.css";

function BoardDetail({ boards, deleteBoard }) {
  const { boardId } = useParams();
  const board = boards.find((board) => board.id === parseInt(boardId));
  const navigate = useNavigate();

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-detail">
      <img src={board.img_url} alt={board.title} className="board-image" />
      <h3>{board.title}</h3>
      <p>{board.category}</p>
      <div className="detail-buttons">
        <button
          className="delete-button"
          onClick={() => {
            deleteBoard(board.id);
            navigate("/");
          }}
        >
          Delete Board
        </button>
      </div>
    </div>
  );
}

export default BoardDetail;
