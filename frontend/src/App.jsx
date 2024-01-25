import { useState, useEffect } from 'react';
import EvaluationList from './components/EvaluationList';
import EvaluationForm from './components/EvaluationForm';
import socketIOClient from 'socket.io-client';
import './App.css';

const ENDPOINT = 'http://localhost:3001';

const App = () => {
  const [Evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const EvaluationsResponse = await fetch(`${ENDPOINT}/evaluation`);
        const EvaluationsData = await EvaluationsResponse.json();
        setEvaluations(EvaluationsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();

    const socket = socketIOClient(ENDPOINT);

    socket.on('updateEvaluations', (updatedEvaluations) => {
      // Actualizar la lista de Evaluationos cuando se emiten actualizaciones
      setEvaluations(updatedEvaluations);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEvaluationSubmit = async (Evaluation) => {
    try {
      let response;
      if (selectedEvaluation) {
        // Si hay un Evaluationo seleccionado, realizar una actualización
        response = await fetch(`${ENDPOINT}/evaluation/${selectedEvaluation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Evaluation),
        });
      } else {
        // Si no hay un Evaluationo seleccionado, realizar una adición
        response = await fetch(`${ENDPOINT}/evaluation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Evaluation),
        });
      }

      if (response.ok) {
        const updatedEvaluations = await response.json();
        const socket = socketIOClient(ENDPOINT);
        socket.emit('updateEvaluations', updatedEvaluations);
        setSelectedEvaluation(null);
      } else {
        throw new Error('Error al realizar la operación en el Evaluation');
      }
    } catch (error) {
      console.error('Error en la solicitud de operación en el Evaluation:', error.message);
    }
  };

  const handleDeleteSubmit = async (EvaluationId) => {
    try {
      const response = await fetch(`${ENDPOINT}/evaluation/${EvaluationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEvaluations = await response.json();
        const socket = socketIOClient(ENDPOINT);
        socket.emit('updateEvaluations', updatedEvaluations);
        setSelectedEvaluation(null);
      } else {
        throw new Error('Error al eliminar el Evaluacion.');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminar Evaluacion:', error.message);
    }
  };

  const handleSelectEvaluation = (Evaluation) => {
    setSelectedEvaluation(Evaluation);
  };

  return (
    <div className="App">
      <header>
        <h1>Evaluaciones para Fundamentos de Programacion</h1>
      </header>
      <main>
        <section className="Evaluation-section">
          <h2><evaluation></evaluation> Disponibles</h2>
          <EvaluationList Evaluations={Evaluations} onSelectEvaluation={handleSelectEvaluation} />
        </section>
        <section className="form-section">
          <h2>{selectedEvaluation ? 'Actualizar Evaluacion' : 'Agregar Evaluacion'}</h2>
          <EvaluationForm Evaluation={selectedEvaluation} onEvaluationSubmit={handleEvaluationSubmit} />
        </section>
        {selectedEvaluation && (
          <section className="form-section">
            <h2>Eliminar Evaluacion</h2>
            <button onClick={() => handleDeleteSubmit(selectedEvaluation.id)}>Eliminar Evaluacion</button>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
