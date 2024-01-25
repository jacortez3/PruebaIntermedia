import { useState } from 'react';
import PropTypes from 'prop-types';

const AddEvaluationForm = ({ onEvaluationSubmit, onDatabaseUpdate }) => {
  const [EvaluationName, setEvaluationName] = useState('');
  const [EvaluationQuestions, setEvaluationQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (EvaluationName && EvaluationQuestions.length > 0) {
      const newEvaluation = {
        name: EvaluationName,
        questions: EvaluationQuestions,
      };

      onEvaluationSubmit(newEvaluation);
      onDatabaseUpdate();

      // Limpiar los campos después de la presentación
      setEvaluationName('');
      setEvaluationQuestions([]);
    } else {
      console.error('Todos los campos son obligatorios.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={EvaluationName}
        onChange={(e) => setEvaluationName(e.target.value)}
        placeholder="Nombre de la evaluación"
      />
      {EvaluationQuestions.map((question, index) => (
        <QuestionInput
          key={question.id}
          question={question.pregunta}
          answers={question.respuestas}
          setQuestion={(newQuestion) => setEvaluationQuestions((prevQuestions) => {
            prevQuestions[index] = newQuestion;
            return prevQuestions;
          })}
        />
      ))}
      <button type="submit">Agregar evaluación</button>
    </form>
  );
};

AddEvaluationForm.propTypes = {
  onEvaluationSubmit: PropTypes.func.isRequired,
  onDatabaseUpdate: PropTypes.func.isRequired,
};

export default AddEvaluationForm;

