import Card from "../Card/Card";
import "./CardList.css";
import Button from "../Button/Button";

function CardList() {
  return (
    <>
      <Button name="Create New Card" />
      <div className="card-list">
        <Card />
        <Card />
      </div>
    </>
  );
}

export default CardList;
