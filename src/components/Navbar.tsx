import React from 'react';
import styles from './Navbar.module.css'; // Adicione seu arquivo CSS aqui

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Nome da empresa */}
        <div className={styles.brand}>
          <a href="/">
            <h1>SmartVote</h1>
          </a>
        </div>

        {/* Links e barra de busca */}
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
