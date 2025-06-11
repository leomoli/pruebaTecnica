import type { AllUsers } from "../model/UsersModel";

const BASE_URL = 'https://dummyjson.com/users';

export async function getAllUsers (limit = 10, skip = 0):Promise<AllUsers> {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}&delay=1000`);
  if(!response.ok) throw new Error('Error al obtener los usuarios');
  
  const data = await response.json();
  return data;
}

export async function getUserById(id:any) {
  const response = await fetch(`${BASE_URL}/${id}/?delay=1000`);
  if(!response.ok) throw new Error('Error al obtener al usuario');

  const data = await response.json();
  return data;
}