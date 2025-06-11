import type { AllUsers } from "../model/UsersModel";

const BASE_URL = 'https://dummyjson.com/users/?delay=1000';

export async function getAllUsers ():Promise<AllUsers> {
  const response = await fetch(BASE_URL);
  if(!response.ok) throw new Error('Error al obtener los usuarios');
  
  const data = await response.json();
  return data;
}