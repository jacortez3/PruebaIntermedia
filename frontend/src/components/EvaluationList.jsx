import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const evaluationList = ({ evaluations }) => {
  const [evaluationsData, setevaluationsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/evaluation');
        const data = await response.json();
        setevaluationsData(data);
      } catch (error) {
        console.error('Error al cargar pruebas:', error.message);
      }
    };

    fetchData();

    // Configurar el socket para escuchar cambios en tiempo real
    const socket = io('http://localhost:3001');
    socket.on('newevaluation', (newevaluation) => {
      setevaluationsData((prevevaluationsData) => [...prevevaluationsData, newevaluation]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Pruebas disponibles</h2>
      <ul>
        {evaluationsData.map((evaluation) => (
          <li key={evaluation.id}>
            {evaluation.name}
            <button onClick={() => onSelectevaluation(evaluation)}>Seleccionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

evaluationList.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default evaluationList;

