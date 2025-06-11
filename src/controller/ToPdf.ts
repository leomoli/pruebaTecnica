import type { Users } from "../model/UsersModel";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function toPdf(users:Users[]){
      const doc = new jsPDF();

  doc.text('Lista de Usuarios', 14, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Nombre','Apellido', 'Email', 'Edad', 'Compañía', 'Puesto', 'Universidad']],
    body: users.map(user => [
      user.firstName,
      user.lastName,
      user.email,
      user.age.toString(),
      user.company.name,
      user.company.title,
      user.university,
    ]),
  });

  doc.save('usuarios.pdf');
}