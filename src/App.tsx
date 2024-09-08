import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PartidosContainer from './components/PartidosContainer';
import TabelaCandidatos from './components/TabelaCandidatos';
import FormularioCandidato from './components/FormularioCandidato';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Candidato } from './types/types';
import Layout from './layout/layout';

const App = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/candidatos')
      .then(response => setCandidatos(response.data))
      .catch(error => console.error('Erro ao buscar candidatos:', error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Página inicial (não exibe TabelaCandidatos) */}
        <Route 
          path="/" 
          element={
            <Layout showSearchBar={true}>
              {/* Outros componentes aqui */}
            </Layout>
          } 
        />
        {/* Outras páginas (exibem TabelaCandidatos) */}
        <Route 
          path="/master" 
          element={
            <Layout showSearchBar={false}>
              <TabelaCandidatos candidatos={candidatos} />
            </Layout>
          } 
        />
        <Route path="/master/create" element={<Layout showSearchBar={false}><FormularioCandidato /></Layout>} />
        <Route path="/master/edit/:id" element={<Layout showSearchBar={false}><FormularioCandidato /></Layout>} />
        <Route path="/master/view/:id" element={<Layout showSearchBar={false}><FormularioCandidato /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
