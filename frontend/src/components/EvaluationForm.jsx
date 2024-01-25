import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EvaluationForm = ({ test, onEvaluationSubmit }) => {
  const [testId, setTestId] = useState('');
  const [EvaluationName, setEvaluationName] = useState('');

  useEffect(() => {
    // Si hay una prueba proporcionada, establecer los valores iniciales
    if (test) {
      setTestId(test.id);
      setEvaluationName(test.name || '');
    }
  }, [test]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que se ingresen los datos necesarios
    if (!EvaluationName) {
      console.error('Por favor, ingrese el nombre de la prueba.');
      return;
    }

    // Crear un objeto de prueba con los datos del formulario
    const newEvaluation = {
      name: EvaluationName,
      testId: testId,
    };

    // Enviar el objeto de prueba al manejador del formulario principal
    onEvaluationSubmit(newEvaluation);

    // Limpiar los campos del formulario
    setEvaluationName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la Prueba:
        <input type="text" value={EvaluationName} onChange={(e) => setEvaluationName(e.target.value)} />
      </label>
      <button type="submit">{test ? 'Actualizar Prueba' : 'Agregar Prueba'}</button>
    </form>
  );
};

export default EvaluationForm;

EvaluationForm.propTypes = {
  test: PropTypes.object.isRequired,
  onEvaluationSubmit: PropTypes.func.isRequired,
};
