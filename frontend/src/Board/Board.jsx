import React, { useState } from "react";
import "./Board.css";

function Board(props) {
  function handleDeleteBoard(id) {
    props.deleteBoard((previtems) =>
      previtems.filter((item, index) => index !== id)
    );
  }
  return (
    <div className="board">
      <img src={props.img_url} alt="" />
      <h3>{props.title}</h3>
      <p>{props.category}</p>
      <div className="delete-and-view-buttons">
        <button className="view-button" onClick={props.displayBoard}>
          View Board
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteBoard(props.id)}
        >
          Delete Board
        </button>
      </div>
    </div>
  );
}

export default Board;
