import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { boardId } = useParams();

  const filteredBoards = boards.filter((board) => {
    if (selectedCategory !== "all" && board.category !== selectedCategory) {
      return false;
    }
    if (
      searchQuery &&
      !board.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  function handleDisplayCreateForm() {
    setDisplayCreateForm(!displayCreateForm);
  }

  async function handleDisplayBoard() {
    const response = await fetch(
      "https://kudos-board-ex4c.onrender.com/boards",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBoards(data);
  }

  useEffect(() => {
    handleDisplayBoard();
  }, []);

  async function handleDeleteBoard(id) {
    try {
      const response = await fetch(
        `https://kudos-board-ex4c.onrender.com/boards/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        handleDisplayBoard();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCard(cardId) {
    try {
      const response = await fetch(
        `https://kudos-board-ex4c.onrender.com/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        handleDisplayBoard();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function onCreateBoard(title, category, author) {
    try {
      const response = await fetch(
        "https://kudos-board-ex4c.onrender.com/boards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, category, author }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        handleDisplayBoard();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {displayCreateForm && (
                    <CreateForm
                      formName="board"
                      displayForm={handleDisplayCreateForm}
                      handleCreate={onCreateBoard}
                    />
                  )}
                  <SearchBar query={searchQuery} onSearch={setSearchQuery} />
                  <div className="buttons">
                    <Button
                      name="All"
                      onClick={() => setSelectedCategory("all")}
                    />
                    <Button
                      name="Recent"
                      onClick={() => setSelectedCategory("recent")}
                    />
                    <Button
                      name="Celebration"
                      onClick={() => setSelectedCategory("celebration")}
                    />
                    <Button
                      name="Thank You"
                      onClick={() => setSelectedCategory("thank you")}
                    />
                    <Button
                      name="Inspiration"
                      onClick={() => setSelectedCategory("inspiration")}
                    />
                  </div>

                  <div className="create-buttons">
                    <Button
                      name="Create New Board"
                      onClick={handleDisplayCreateForm}
                    />
                  </div>
                  <BoardList
                    board={filteredBoards}
                    deleteBoard={handleDeleteBoard}
                  />
                </>
              }
            />
            <Route
              path="/boards/:boardId/cards"
              element={
                <>
                  <div className="create-buttons">
                    <CardList
                      cards={cards}
                      setCards={setCards}
                      deleteCard={deleteCard}
                    />
                  </div>
                </>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
