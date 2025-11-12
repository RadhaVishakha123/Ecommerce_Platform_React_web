
import { useState, useEffect } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🕒 Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000); // wait 500ms after typing stops

    return () => clearTimeout(timer); // cleanup if user types again quickly
  }, [searchTerm]);

  // 👀 Run "search" when debounced value changes
  useEffect(() => {
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <p className="mt-3 text-gray-700">
        Typing: <strong>{searchTerm}</strong>
      </p>
      <p className="text-blue-600">
        Debounced Search Value: <strong>{debouncedSearch}</strong>
      </p>
    </div>
  );
}
