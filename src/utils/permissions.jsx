export const rolePermissions = {
    Tutor_Legal: ['Inicio', 'Pagos'],
    Docente: ['Inicio', 'Seccion', 'Horario', 'Inscripciones', 'Año Academico'],
    Admin: ['Inicio', 'Materia', 'Seccion', 'Horario', 'Pagos', 'Inscripciones', 'Año Academico','Reporte']
  };

  export const getUserRole = (role) => {
    switch (role) {
      case 1:
        return { name: 'Tutor_Legal', permissions: rolePermissions.Tutor };
      case 19:
        return { name: 'Docente', permissions: rolePermissions.Docente };
      case 3:
        return { name: 'Admin', permissions: rolePermissions.Admin };
      default:
        return { name: 'Desconocido', permissions: [] };
    }
  };