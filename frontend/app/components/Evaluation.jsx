// Evaluation.js

"use client";
import React, { useState } from "react";

function Evaluation({ pregunta }) {
  const { id, enunciado, respuesta_correcta } = pregunta;
  const [c, setC] = useState("");
  const [a, setA] = useState("");
  const [nombre, setNombre] = useState("");

  return (
    <div className="flex flex-col items-center">
      <label className="text-lg font-bold mb-2">Ingresa la pregunta {id}</label>
      <textarea
        type="text"
        className="border border-gray-300 rounded-md p-2 mb-2"
        onChange={(e) => setC(e.target.value)}
      />

      <label className="text-lg font-bold mb-2">
        Ingresa la respuesta {id}
      </label>
      <input
        className="border border-gray-300 rounded-md p-2 mb-2"
        onChange={(e) => setA(e.target.value)}
      />
      <h2 className="text-xl font-bold mb-4">{nombre}</h2>
    </div>
  );
}

export default Evaluation;
