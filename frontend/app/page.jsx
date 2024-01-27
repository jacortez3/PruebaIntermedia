import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <header className="py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Sistema de Evaluación Estudiantil (Fundamentos de Programacion)
        </h1>
      </header>
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://cdn-icons-png.flaticon.com/256/10777/10777541.png"
              alt="Imagen 1"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">Patricia Anchapaxi</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://cdn-icons-png.flaticon.com/256/9436/9436966.png"
              alt="Imagen 2"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">Jonathan Cortez</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              src="https://cdn-icons-png.flaticon.com/256/6213/6213629.png"
              alt="Imagen 3"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">Luciana Guerra</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
