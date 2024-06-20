import React, { useState } from "react";
import Board from "../Board/Board";
import "./BoardList.css";

function BoardList({ board, handleDisplayBoardPage, deleteBoard }) {
  return (
    <div className="board-list">
      {board.map((board, index) => {
        return (
          <Board
            key={index}
            id={board.id}
            title={board.title}
            img_url={board.img_url}
            category={board.category}
            displayBoard={handleDisplayBoardPage}
            deleteBoard={deleteBoard}
          />
        );
      })}
    </div>
  );
}

export default BoardList;
