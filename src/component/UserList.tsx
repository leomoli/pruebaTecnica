import React, { use, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'; 
import { getAllUsers } from '../controller/UserApi';
import type { Users } from '../model/UsersModel';
import LoadingUsers from './LoadingUsers';
import ErrorUsers from './ErrorUsers';
import { data, useNavigate } from 'react-router-dom';
import UserNotFound from './UserNotFound';
import {toPdf} from '../controller/ToPdf';

const USERS_PER_PAGE = 10;

const UserList = () => {
    const [users,setUsers]=useState<Users[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search,setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const navigate = useNavigate();

    const userList = async (page:number) => {
        setLoading(true);
        try {
            const skip = page * USERS_PER_PAGE;
            const list = await getAllUsers(USERS_PER_PAGE, skip);
            setUsers(list.users);
            setTotalUsers(list.total);
        } catch (error) {
            setError(`${error}`);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        userList(currentPage);
    },[currentPage]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const userFilter = users?.filter((user)=>{
        const searchData = `
        ${user.firstName}
        ${user.lastName}
        ${user.email}
        ${user.age}
        ${user.gender}
        ${user.company.name}
        ${user.company.title}
        ${user.university}
        `.toLowerCase();

        return searchData.includes(search.toLowerCase());
    });

    const userstoPdf = (us:Users[]) =>{
        toPdf(us);
    }

  return (
    <>
        <h1 className="text-3xl font-bold text-center my-6">Listado de usuarios</h1>        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    {userFilter.length > 0 && (
                        <button
                            onClick={() => userstoPdf(userFilter)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                            Exportar a PDF
                        </button>
                    )}
                </div>
        {loading && <LoadingUsers />}
        {error && <ErrorUsers />}
        {!loading && !error && (
            <>
                {userFilter.length === 0 ? (<UserNotFound />) : (
                    <div className="overflow-x-auto px-4">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Foto</th>
                                <th className="px-4 py-2 text-left">Nombre</th>
                                <th className="px-4 py-2 text-left">Apellido</th>
                                <th className="px-4 py-2 text-left">Edad</th>
                                <th className="px-4 py-2 text-left">Género</th>
                                <th className="px-4 py-2 text-left">Correo</th>
                                <th className="px-4 py-2 text-left">Compañía</th>
                                <th className="px-4 py-2 text-left">Puesto</th>
                                <th className="px-4 py-2 text-left">Universidad</th>
                                <th className="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userFilter.map((user) => (
                            <tr key={user.id} className="border-b">
                            <td className="px-4 py-2">
                            <img
                                src={user.image}
                                alt={user.firstName}
                                className="w-10 h-10 rounded-full object-cover"/>
                            </td>
                            <td className="px-4 py-2">{user.firstName}</td>
                            <td className="px-4 py-2">{user.lastName}</td>
                            <td className="px-4 py-2">{user.age}</td>
                            <td className="px-4 py-2 capitalize">{user.gender}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.company.name}</td>
                            <td className="px-4 py-2">{user.company.title}</td>
                            <td className="px-4 py-2">{user.university}</td>
                            <td className="px-4 py-2">
                                <button
                                onClick={() => navigate(`/user/${user.id}`)}
                                className="text-blue-600 font-bold text-lg hover:text-blue-800">+
                                </button>
                            </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                )}
            </>
        )}
        <div className="my-6 flex justify-center">
            <ReactPaginate
                previousLabel={'← Anterior'}
                nextLabel={'Siguiente →'}
                breakLabel={'...'}
                pageCount={Math.ceil(totalUsers / USERS_PER_PAGE)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'flex gap-2'}
                activeClassName={'font-bold underline'}
                pageClassName={'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200'}
                previousClassName={'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200'}
                nextClassName={'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200'}
                breakClassName={'px-3 py-1'}
                forcePage={currentPage}/>
        </div>
    </>
  )
}

export default UserList
