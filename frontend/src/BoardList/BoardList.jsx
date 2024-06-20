import React, { useState } from "react";
import Board from "../Board/Board";
import "./BoardList.css";

function BoardList(props) {
  return (
    <div className="board-list">
      {props.board.map((board) => {
        return (
          <Board
            key={board.id}
            title={board.title}
            img_url={board.img_url}
            category={board.category}
            displayBoard={props.handleDisplayBoardPage}
            // deleteBoard={props.deleteBoard(board.id)}
          />
        );
      })}
    </div>
  );
}

export default BoardList;
