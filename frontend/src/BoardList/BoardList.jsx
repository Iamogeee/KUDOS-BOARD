import React, { useState } from "react";
import Board from "../Board/Board";
import "./BoardList.css";

function BoardList(props) {
  return (
    <div className="board-list">
      <Board displayBoard={props.handleDisplayBoardPage} />
      <Board displayBoard={props.handleDisplayBoardPage} />
      <Board displayBoard={props.handleDisplayBoardPage} />
      <Board displayBoard={props.handleDisplayBoardPage} />
      <Board displayBoard={props.handleDisplayBoardPage} />
    </div>
  );
}

export default BoardList;
