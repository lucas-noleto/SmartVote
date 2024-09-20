import React from 'react';
import styles from './Navbar.module.css';  

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a href="/">
            <h1>SmartVote</h1>
          </a>
        </div>

    
        <ul className={styles.nav_links}>
          <li><a href="/">Candidatos</a></li>
          <li><a href="/master">Master</a></li>
          <li><a href="/estatisticas">Estatisticas</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
