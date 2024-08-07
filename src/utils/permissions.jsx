export const rolePermissions = {
    Tutor: ['Inicio', 'Pagos'],
    Docente: ['Inicio', 'Seccion', 'Horario', 'Inscripciones', 'Año Academico'],
    Admin: ['Inicio', 'Materia', 'Seccion', 'Horario', 'Pagos', 'Inscripciones', 'Año Academico','Reporte Inscripcion','Reporte Pago']
  };

  export const getUserRole = (role) => {
    switch (role) {
      case 1:
        return { name: 'Tutor', permissions: rolePermissions.Tutor };
      case 19:
        return { name: 'Docente', permissions: rolePermissions.Docente };
      case 3:
        return { name: 'Admin', permissions: rolePermissions.Admin };
      default:
        return { name: 'Desconocido', permissions: [] };
    }
  };