import React, { use, useEffect, useState } from 'react'
import { getAllUsers } from '../controller/UserApi';
import type { Users } from '../model/UsersModel';
import LoadingUsers from './LoadingUsers';
import ErrorUsers from './ErrorUsers';
import { useNavigate } from 'react-router-dom';
import UserNotFound from './UserNotFound';
import {toPdf} from '../controller/ToPdf';

const UserList = () => {
    const [users,setUsers]=useState<Users[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search,setSearch] = useState('');
    const navigate = useNavigate();

    const userList = async () => {
        try {
            const list = await getAllUsers();
            setUsers(list.users)
        } catch (error) {
            setError(`${error}`);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        userList();
    },[]);

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
        <h1>Lista de usuarios</h1>
        {loading && <LoadingUsers/>}
        {error && <ErrorUsers/>}
        {!loading && !error && (
            <>
            <input 
                type='text'  
                placeholder='Buscar ...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
            {userFilter.length=== 0 ? <></>:<button onClick={()=>userstoPdf(userFilter)}>Exportar a pdf</button>}
            {userFilter.length === 0 ? <UserNotFound/> :(
                <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Genero</th>
                        <th>Correo</th>
                        <th>Compañía</th>
                        <th>Puesto</th>
                        <th>Universidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {userFilter.map(user => (
                        <tr key={user.id}>
                            <td>
                            <img src={user.image}  width={40}/>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                            <td>{user.company.title}</td>
                            <td>{user.university}</td>
                            <td><button onClick={()=>navigate(`/user/${user.id}`)}>+</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            </>
        )}
    </>
  )
}

export default UserList
