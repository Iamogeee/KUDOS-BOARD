import "./SearchBar.css";

// function SearchBar() {
//   return (
//     <div className="searchbar">
//       <input type="text" placeholder="Search boards..." />
//     </div>
//   );
// }

// export default SearchBar;

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
