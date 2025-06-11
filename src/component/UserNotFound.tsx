import React from 'react'

const UserNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 mt-10 bg-yellow-50 border border-yellow-200 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-yellow-700">Usuario no encontrado</h2>
      <p className="text-yellow-600 mt-2">No se encontró ningún usuario con la información ingresada.</p>
    </div>
  )
}

export default UserNotFound
