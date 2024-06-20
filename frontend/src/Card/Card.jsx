import "./Card.css";
import { useState } from "react";

function Card() {
  const [upvotes, setUpvotes] = useState(0);
  function handleVotes() {
    setUpvotes(upvotes + 1);
  }
  return (
    <div className="card">
      <p>Text Message</p>
      <img src="public/giphy.webp" alt="" />
      <p>Card Author</p>
      <div className="card-buttons">
        <button onClick={handleVotes}> {`Upvote:${upvotes}`} </button>
        <button>Delete Card</button>
      </div>
    </div>
  );
}

export default Card;
