import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import BoardList from "./BoardList/BoardList";
import Footer from "./Footer/Footer";
import CreateForm from "./CreateForm/CreateForm";
import CardList from "./CardList/CardList";

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false);
  const [displayBoardPage, setDisplayBoardPage] = useState(false);
  const [boards, setBoards] = useState([]);

  function handleDisplayBoardPage() {
    setDisplayBoardPage(!displayBoardPage);
  }

  function handleDisplayCreateForm() {
    setDisplayCreateForm(!displayCreateForm);
  }

  async function handleDisplayBoard() {
    const response = await fetch("http://localhost:3000/boards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBoards(data);
  }

  useEffect(() => {
    handleDisplayBoard();
  });

  async function handleDeleteBoard(id) {
    try {
      const response = await fetch(`http://localhost:3000/boards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        handleDisplayBoard();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      {!displayBoardPage ? (
        <>
          {displayCreateForm ? (
            <CreateForm displayForm={handleDisplayCreateForm} />
          ) : null}

          <Header />

          <main>
            <SearchBar />
            <div className="buttons">
              <Button name="All" />
              <Button name="Recent" />
              <Button name="Celebration" />
              <Button name="Thank You" />
              <Button name="Inspiration" />
            </div>

            <div className="create-buttons">
              <Button
                name="Create New Board"
                displayForm={handleDisplayCreateForm}
              />
            </div>
            <BoardList
              handleDisplayBoardPage={handleDisplayBoardPage}
              board={boards}
              deleteBoard={handleDeleteBoard}
            />
          </main>

          <Footer />
        </>
      ) : (
        <CardList handleDisplayBoardPage={handleDisplayBoardPage} />
      )}
    </div>
  );
}

export default App;
