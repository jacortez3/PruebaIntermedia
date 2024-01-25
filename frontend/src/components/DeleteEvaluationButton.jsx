import PropTypes from 'prop-types';

const DeleteEvaluationButton = ({ evaluationId, onDeleteSubmit }) => {
    const handleDelete = () => {
        onDeleteSubmit(evaluationId);
    };

    return (
        <button onClick={handleDelete}>Eliminar evaluacion</button>
    );
};

DeleteEvaluationButton.propTypes = {
    evaluationId: PropTypes.number.isRequired,
    onDeleteSubmit: PropTypes.func.isRequired,
};

export default DeleteEvaluationButton;
