import React from 'react'

const ErrorUsers = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-red-100 border border-red-300 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold text-red-700">Error al obtener los datos</h2>
      <p className="text-red-600 mt-2">Por favor, intenta nuevamente más tarde.</p>
    </div>
  )
}

export default ErrorUsers
