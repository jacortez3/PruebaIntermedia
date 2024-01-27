import Link from "next/link";

export async function getEvaluations() {
  const response = await fetch("http://localhost:4001/");
  const data = await response.json();

  return data;
}
export function Obtener({name}) {
    console.log(name);
}
async function ReadEvaluations() {
 const evaluationsquestions = await getEvaluations();
   
    return (
        <>
        <Obtener></Obtener>
        <div className="flex justify-start ml-5">
        <Link
          href="/profesor/"
          className="text-2xl mb-5 mt-5 text-center inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Regresar
        </Link>
      </div>
        <div className="flex justify-center">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {evaluationsquestions.map((evaluation) => (
                    <div
                        key={evaluation.id}
                        className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between"
                    >
                        <h2 className="text-lg font-semibold mb-4">{evaluation.name}</h2>
                        <ul>
                            {evaluation.preguntas.map((pregunta) => (
                                <li key={pregunta.id} className="mb-2">
                                    <strong>{pregunta.enunciado}</strong>
                                    <p>{pregunta.respuesta_correcta}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        </>
        
    );
}

export default ReadEvaluations;
