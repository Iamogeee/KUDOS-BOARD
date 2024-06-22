import "./Card.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Card({ card, deleteCard, upvoteCard }) {
  const { boardId } = useParams();
  // const [upvotes, setUpvotes] = useState(0);
  // const [voteName, setVoteName] = useState("Upvote");
  const handleUpvote = async () => {
    upvoteCard(card.id);
  };

  function handleDeleteCard() {
    deleteCard(card.id);

    // TODO: fix temporary solution to refreshing page
    window.location.reload();
  }

  return (
    <div className="card">
      <p>{card.message}</p>
      <img src={card.img_url} alt="" />
      <p>{card.author}</p>
      <div className="card-buttons">
        <button onClick={handleUpvote}> {`Upvotes: ${card.upvote}`} </button>
        <button onClick={handleDeleteCard}>Delete Card</button>
      </div>
    </div>
  );
}

export default Card;
