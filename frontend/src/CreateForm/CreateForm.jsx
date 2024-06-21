import "./CreateForm.css";
import React, { useState, useEffect } from "react";

// This form is shared by both Cards and Boards
function CreateForm(props) {
  //const [boards, setBoards] = useState([]);
  //const [cards, setCards] = useState([]);

  // async function addBoard(title, category, author) {
  //   try {
  //     const response = await fetch("http://localhost:3000/boards", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, category, author }),
  //     });
  //     const data = await response.json();
  //     //setBoards([...boards, data]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function addCard(boardId, message, author) {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/boards/${boardId}/cards`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ message, author }),
  //       }
  //     );
  //     const data = await response.json();
  //     setCards([...cards, data]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // if (props.formName == "board") {

  const isCreatingBoard = props.isCreatingBoard;
  return (
    <div id="create-board-form" className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={props.displayForm}>
          &times;
        </span>
        <h1>Create a new {props.formName}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.elements[0].value;
            const category = e.target.elements[1].value;
            const author = e.target.elements[2].value;
            props.handleCreate(title, category, author);
            props.displayForm();
          }}
        >
          <input type="text" placeholder="Title" />
          <select name="category">
            <option value="public">Select a category</option>
            <option value="recent">Recent</option>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
          </select>

          <input type="text" name="author" placeholder="Author" />
          <button className="create-button">Create Board</button>
        </form>
      </div>
    </div>
  );
  // } else if (props.formName == "card") {
  //   return (
  //     <div id="create-card-form" className="modal-overlay">
  //       <div className="modal-content">
  //         <span className="close" onClick={props.displayForm}>
  //           &times;
  //         </span>
  //         <h1>Create a new {props.formName}</h1>
  //         <form
  //           onSubmit={(e) => {
  //             e.preventDefault();
  //             const message = e.target.elements[0].value;
  //             const author = e.target.elements[1].value;
  //             addCard(props.boardId, message, author);
  //             props.displayForm();
  //           }}
  //         >
  //           <textarea type="text" name="message" placeholder="Message" />
  //           <input type="text" name="author" placeholder="Author" />
  //           <button className="create-button">Create Card</button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }
}

export default CreateForm;
