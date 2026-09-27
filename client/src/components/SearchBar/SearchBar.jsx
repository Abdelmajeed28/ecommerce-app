import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search Products"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          borderColor: "var(--border-color)",
        }}
        className="w-full border  rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all active:scale-95"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

export default SearchBar;
