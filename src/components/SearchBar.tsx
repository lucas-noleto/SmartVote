import React from 'react';
import './SearchBar.Module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Buscar por nome" 
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
