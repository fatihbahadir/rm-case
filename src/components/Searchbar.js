import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text)
    onSearch(searchTerm);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FaSearch className="text-gray-300 transition-all"/>
      </div>
      <input
        type="search"
        id="default-search"
        className="w-full p-4 ps-10  text-sm transition-all text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-green "
        placeholder="Search episodes, characters, locations etc."
        onChange={(e) =>  handleSearch(e.target.value)}

      />
    
    </div>
  );
};

export default Searchbar;
