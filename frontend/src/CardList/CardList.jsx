import Card from "../Card/Card";
import "./CardList.css";
import Button from "../Button/Button";
import CreateForm from "../CreateForm/CreateForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//the problem is the Card form and the Board form have very different fields, so we can't easily share code between them.
// so we can have 2 separate components for both dialogs / forms
// Take CreateForm and split it out into CreateCardForm and CreateBoardForm
function CardList({ cards, setCards, deleteCard }) {
  const { boardId } = useParams();
  // const [cards, setCards] = useState([]);
  // const [cardId, setCardId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  // function onCreateCard() {
  // console.log("Card Created");
  // }

  async function addCard(message, author) {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${boardId}/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, author }),
        }
      );
      const data = await response.json();
      setCards([...cards, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCards() {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/${boardId}/cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function upvoteCard(id) {
    try {
      const response = await fetch(`http://localhost:3000/cards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getCards();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCards(boardId);
  }, [boardId]);

  function handleDisplayCreateForm() {
    setShowCreateForm(!showCreateForm);
  }

  let cardList;
  if (cards && cards.length > 0) {
    cardList = cards.map((card) => (
      <Card
        card={card}
        key={card.id}
        deleteCard={deleteCard}
        upvoteCard={upvoteCard}
      />
    ));
  }

  return (
    <>
      <Button name="Create New Card" onClick={handleDisplayCreateForm} />
      {showCreateForm ? (
        <CreateForm
          formName="card"
          handleCreate={addCard}
          displayForm={handleDisplayCreateForm}
        />
      ) : null}

      <div className="card-list">{cardList}</div>
    </>
  );
}

export default CardList;
