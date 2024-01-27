import Link from "next/link";

function EvaluacionForm() {
  return (
    <>
      <div className="flex justify-center">
        <Link
          href="/profesor/createEvaluations"
          className="text-2xl mb-5 mt-5 text-center inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto"
        >
          Crear evaluacion
        </Link>
      </div>
      <div className="flex justify-center">
        <Link
          href="/profesor/readEvaluations"
          className="text-2xl mb-5 mt-5 text-center inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
        >
          Evaluaciones
        </Link>
      </div>
    </>
  );
}

export default EvaluacionForm;
