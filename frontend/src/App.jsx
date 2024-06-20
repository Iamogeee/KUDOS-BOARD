import { useState } from "react";
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

  function handleDisplayBoardPage() {
    setDisplayBoardPage(!displayBoardPage);
  }

  function handleDisplayCreateForm() {
    setDisplayCreateForm(!displayCreateForm);
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
            <BoardList handleDisplayBoardPage={handleDisplayBoardPage} />
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
