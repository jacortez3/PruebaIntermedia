import { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateTestForm = ({ test, onUpdateSubmit }) => {
  const [testName, setTestName] = useState(test.name);
  const [testQuestions, setTestQuestions] = useState(test.questions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testName && testQuestions) {
      const updatedTest = {
        id: test.id,
        name: testName,
        questions: testQuestions,
      };
      onUpdateSubmit(updatedTest);
    } else {
      console.error('Todos los campos son obligatorios.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        placeholder="Nombre de la prueba"
      />
      <ul>
        {testQuestions.map((question) => (
          <li key={question.id}>
            {question.question}
            <button onClick={() => setTestQuestions((prevTestQuestions) => [...prevTestQuestions, question])}>Agregar pregunta</button>
          </li>
        ))}
      </ul>
      <button type="submit">Actualizar prueba</button>
    </form>
  );
};

UpdateTestForm.propTypes = {
  test: PropTypes.object.isRequired,
  onUpdateSubmit: PropTypes.func.isRequired,
};

export default UpdateTestForm;
