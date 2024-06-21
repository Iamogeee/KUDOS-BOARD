import Card from "../Card/Card";
import "./CardList.css";
import Button from "../Button/Button";
import CreateForm from "../CreateForm/CreateForm";
import { useState } from "react";

//the problem is the Card form and the Board form have very different fields, so we can't easily share code between them.
// so we can have 2 separate components for both dialogs / forms
// Take CreateForm and split it out into CreateCardForm and CreateBoardForm
function CardList() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  function onCreateCard() {
    console.log("Card Created");
  }
  return (
    <>
      <Button onClick={() => setShowCreateForm(true)} name="Create New Card" />
      {showCreateForm ? <CreateForm handleCreate={onCreateCard} /> : null}

      <div className="card-list">
        <Card />
        <Card />
      </div>
    </>
  );
}

export default CardList;
