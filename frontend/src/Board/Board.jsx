import React, { useState } from "react";
import "./Board.css";

function Board(props) {
  return (
    <div className="board">
      <img src="/public/giphy.webp" alt="" />
      <h3>Title</h3>
      <p>Category</p>
      <div className="delete-and-view-buttons">
        <button className="view-button" onClick={props.displayBoard}>
          View Board
        </button>
        <button className="delete-button">Delete Board</button>
      </div>
    </div>
  );
}

export default Board;
