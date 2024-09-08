import React from 'react';
import './Navbar.Module.css'; // Adicione seu arquivo CSS aqui

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* Nome da empresa */}
        <div className="brand">
          <h1>SmartVote</h1>
        </div>

        {/* Links e barra de busca */}
        <ul className="nav-links">
          <li><a href="/candidatos">Candidatos</a></li>
          <li><a href="/master">Master</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
