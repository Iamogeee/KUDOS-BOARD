import "./Button.css";

function Button(props) {
  return (
    <button
      onClick={() => {
        props.name.includes("Create") ? props.displayForm() : null;
      }}
    >
      {props.name}
    </button>
  );
}

export default Button;
