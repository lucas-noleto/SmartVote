import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TabelaCandidatos from './components/TabelaCandidatos';
import FormularioCandidato from './components/FormularioCandidato/FormularioCandidato';
import EditarCandidato from './components/FormularioCandidato/EditarCandidato';
import VisualizarCandidato from './components/VisualizarCandidato';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Candidato } from './types/types';
import Estatisticas from './pages/Estatisticas';
import Footer from './components/Footer';
import apiUrl from '../axios/config'

const App = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    apiUrl.get('/candidatos')
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
      <Footer />
    </Router>
  );
};

export default App;
