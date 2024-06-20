import React, { useState } from "react";
import "./Board.css";

function Board({ title, img_url, category, displayBoard, deleteBoard, id }) {
  // function handleDeleteBoard(id) {
  //   props.deleteBoard((previtems) =>
  //     previtems.filter((item, index) => index !== id)
  //   );
  // }

  return (
    <div className="board">
      <img src={img_url} alt="" />
      <h3>{title}</h3>
      <p>{category}</p>
      <div className="delete-and-view-buttons">
        <button className="view-button" onClick={displayBoard}>
          View Board
        </button>
        <button className="delete-button" onClick={() => deleteBoard(id)}>
          Delete Board
        </button>
      </div>
    </div>
  );
}

export default Board;
