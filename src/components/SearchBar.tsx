import React from 'react';
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: () => void;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, setBusca }) => {
  return (
    <div className={styles.search_container}>
      <input 
        type="text" 
        className={styles.search_input} 
        placeholder="Buscar por nome" 
        onChange={e => setBusca(e.target.value)}
      />
      <FaSearch className={styles.search_icon} onClick={onSearch} />
    </div>
  );
}

export default SearchBar;
