import "./CreateForm.css";

function CreateForm(props) {
  return (
    <div id="create-form" className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={props.displayForm}>
          &times;
        </span>
        <h1>Create a new post</h1>
        <form>
          <input type="text" placeholder="Title" />
          <select>
            <option value="public">Select a category</option>
            <option value="recent">Recent</option>
            <option value="celebration">Celebration</option>
            <option value="thank you">Thank You</option>
            <option value="inspiration">Inspiration</option>
          </select>

          <input type="text" placeholder="Author" />
          <button className="create-button">Create Board</button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
