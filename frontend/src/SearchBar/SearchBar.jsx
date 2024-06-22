import "./SearchBar.css";

function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search boards..."
    />
  );
}

export default SearchBar;
