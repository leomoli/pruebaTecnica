import React, { useEffect, useState } from 'react'
import type { OneUser } from '../model/UsersModel';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../controller/UserApi';
import LoadingUsers from '../component/LoadingUsers';
import ErrorUsers from '../component/ErrorUsers';

const User = () => {

    const { id } = useParams();

    const [user,setUser] = useState<OneUser>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const getUser = async(id:any) => {
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (error) {
            setError(`${error}`);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser(id);
    },[]);

  return (
<div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Regresar
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">Información del usuario</h1>

      {loading && <LoadingUsers />}
      {error && <ErrorUsers />}

      {!loading && !error && user && (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={user.image}
              alt={user.firstName}
              className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="flex-1 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Información personal</h2>
              <p><span className="font-medium">Nombre de usuario:</span> {user.username}</p>
              <p><span className="font-medium">Nombre:</span> {user.firstName}</p>
              <p><span className="font-medium">Apellido:</span> {user.lastName}</p>
              <p><span className="font-medium">Fecha de nacimiento:</span> {user.birthDate}</p>
              <p><span className="font-medium">Edad:</span> {user.age}</p>
              <p><span className="font-medium">Tipo de sangre:</span> {user.bloodGroup}</p>
              <p><span className="font-medium">Género:</span> {user.gender}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Teléfono:</span> {user.phone}</p>
              <p><span className="font-medium">Universidad:</span> {user.university}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Dirección</h2>
            <p><span className="font-medium">País:</span> {user.address.country}</p>
            <p><span className="font-medium">Ciudad:</span> {user.address.city}</p>
            <p><span className="font-medium">Estado:</span> {user.address.state}</p>
            <p><span className="font-medium">Dirección:</span> {user.address.address}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Información de la Compañía</h2>
            <p><span className="font-medium">Nombre:</span> {user.company.name}</p>
            <p><span className="font-medium">Área:</span> {user.company.department}</p>
            <p><span className="font-medium">Puesto:</span> {user.company.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default User
