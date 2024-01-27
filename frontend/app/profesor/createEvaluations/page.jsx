// CreateEvaluations.js

"use client";
import { useState } from "react";
import Evaluation from "../../components/Evaluation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Obtener } from "../readEvaluations/page";
function CreateEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [np, setnp] = useState(1);
  const [preguntas, setPreguntas] = useState([]);
  const [mostrarGuardar, setMostrarGuardar] = useState(false);
  const [nombre, setNombre] = useState("");
  let evalu;
  const handleCrearPreguntaClick = () => {
    const nuevaPregunta = {
      id: np,
      enunciado: "",
      respuesta_correcta: "",
    };

    setnp(np + 1);
    setPreguntas([...preguntas, nuevaPregunta]);
    setEvaluations([...evaluations, <Evaluation key={np} pregunta={nuevaPregunta} />]);
    setMostrarGuardar(true);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nuevaEvaluacion = {
      id: evaluations.length + 1,
      name: nombre,
      preguntas: preguntas.map((pregunta) => ({ ...pregunta })),
    };
    evalu=nuevaEvaluacion;
    <Obtener name={evalu}/>
    console.log(evalu)
    console.log("Evaluación a guardar:", nuevaEvaluacion);
    
    
  };

  const router = useRouter();

  return (
    <>
      <div className="flex justify-start ml-5">
        <Link
          href="/profesor/"
          className="text-2xl mb-5 mt-5 text-center inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Regresar
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-5 mt-5">
          <label className="text-lg font-bold mb-2">Nombre de la evaluacion</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mb-2"
            placeholder="Nombre de la evaluacion"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {evaluations.map((evaluation, index) => (
          <div key={index}>{evaluation}</div>
        ))}
        

        {mostrarGuardar && (
          <div className="flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                router.push("/profesor/");
              }}
            >
              Guardar evaluación
            </button>
          </div>
        )}
      </form>
      <div className="flex flex-col items-center mb-5 mt-5">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={handleCrearPreguntaClick
            }
          >
            Crear Pregunta
          </button>
        </div>
    </>
  );
}

export default CreateEvaluations;
