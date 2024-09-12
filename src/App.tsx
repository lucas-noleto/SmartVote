import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TabelaCandidatos from './components/TabelaCandidatos';
import FormularioCandidato from './components/FormularioCandidato';
import EditarCandidato from './components/EditarCandidato';
import VisualizarCandidato from './components/VisualizarCandidato';
import Layout from './layout/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Candidato } from './types/types';
import Estatisticas from './pages/Estatisticas';

const App = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/candidatos')
      .then(response => setCandidatos(response.data))
      .catch(error => console.error('Erro ao buscar candidatos:', error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estatisticas" element={<Estatisticas />}/>
        <Route path="/master" element={<TabelaCandidatos candidatos={candidatos} />} />
        <Route path="/master/create" element={<FormularioCandidato />} />
        <Route path="/master/edit/:id" element={<EditarCandidato />} />
        <Route path="/master/view/:id" element={<VisualizarCandidato />} />
      </Routes>
    </Router>
  );
};

export default App;
