
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className={styles.search_container}>
      <input 
        type="text" 
        className={styles.search_input} 
        placeholder="Buscar por nome" 
      />
      <FaSearch className={styles.search_icon} />
    </div>
  );
}

export default SearchBar;
