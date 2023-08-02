const navigationConfig = () => {
  const rutas = [];
  const tipoUsuario = sessionStorage.getItem('usuario');
  if (tipoUsuario === '1')
    rutas.push(
      {
        id: 'mantenimientoPreInscripcion',
        title: 'Mantenimiento Pre Inscripcion',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'compromisosPago',
            title: 'Compromisos de Pago',
            type: 'item',
            icon: 'monetization_on',
            url: '/tesoreria',
          },
          {
            id: 'preinscritos',
            title: 'Preinscritos',
            type: 'item',
            icon: 'monetization_on',
            url: '/preinscritos',
          },
        ],
      },
      {
        id: 'registroDatos',
        title: 'Registro de Datos',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'padronCursos',
            title: 'Padron Cursos',
            type: 'item',
            icon: 'class',
            url: '/padroncursos',
          },
          {
            id: 'ciclo',
            title: 'Ciclo',
            type: 'item',
            icon: 'school',
            url: '/ciclo',
          },
          {
            id: 'grupoAcademico',
            title: 'Grupo Academico',
            type: 'item',
            icon: 'content_paste',
            url: '/grupoacademico',
          },
          {
            id: 'cursoGrupo',
            title: 'Curso por Grupo',
            type: 'item',
            icon: 'library_books',
            url: '/cursogrupo',
          },
          {
            id: 'examenes',
            title: 'Examenes',
            type: 'item',
            icon: 'history_edu',
            url: '/examenes',
          },
          {
            id: 'asignacionEstudiante',
            title: 'Asignacion de Estudiantes a Curso',
            type: 'item',
            icon: 'how_to_reg',
            url: '/asignacion/estudiantes',
          },
          {
            id: 'pagosCiclo',
            title: 'Pagos por Ciclo',
            type: 'item',
            icon: 'point_of_sale',
            url: '/pagosciclo',
          },
          {
            id: 'horarios',
            title: 'Horarios',
            type: 'item',
            icon: 'access_time',
            url: '/horarios',
          },
          {
            id: 'padronRequisitos',
            title: 'Padron Requisitos',
            type: 'item',
            icon: 'list_alt',
            url: '/padronrequisitos',
          },
          {
            id: 'descargaCSV',
            title: 'Descargar CSV Estudiantes',
            type: 'item',
            icon: 'download',
            url: '/listacsv',
          },
          {
            id: 'subirCSV',
            title: 'Subir notas en CSV',
            type: 'item',
            icon: 'upload_file',
            url: '/csvnotas',
          },
          {
            id: 'docentes',
            title: 'Docentes',
            type: 'item',
            icon: 'person',
            url: '/docentes',
          },
          {
            id: 'administradores',
            title: 'Administradores',
            type: 'item',
            icon: 'admin_panel_settings',
            url: '/administradores',
          },
          {
            id: 'ConsultaInscripcion',
            title: 'Revision de Documentos Inscripcion',
            type: 'item',
            icon: 'fact_check',
            url: '/consultainscripcion',
          },
          {
            id: 'Configuracion',
            title: 'Configuracion',
            type: 'item',
            icon: 'settings',
            url: '/configuraciones',
          },
          {
            id: 'ConsultaAsistenciaDocenteAdmin',
            title: 'Asistencia docentes',
            type: 'item',
            icon: 'list_alt',
            url: '/reportes/asistencia/docente',
          },
        ],
      },
      {
        id: 'infraestructura',
        title: 'Infraestructura',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'escuelaProfesional',
            title: 'Escuela Profesional',
            type: 'item',
            icon: 'school',
            url: '/sincronizarescuelas',
          },
          {
            id: 'pabellon',
            title: 'Pabellon',
            type: 'item',
            icon: 'account_balance',
            url: '/sincronizarpabellon',
          },
          {
            id: 'aulas',
            title: 'Aulas',
            type: 'item',
            icon: 'table_restaurantconsult',
            url: '/sincronizaraulas',
          },
        ],
      },
      {
        id: 'consultasAdmin',
        title: 'Reportes',
        type: 'group',
        icon: 'apps',
        children: [
          // {
          //   id: 'consultaPreInscripcion',
          //   title: 'Consulta Pre Inscripcion',
          //   type: 'item',
          //   icon: 'content_paste',
          //   url: '/consultapreinscripcion',
          // },
          {
            id: 'ConsultaPreInscripcion',
            title: 'Consulta Pre Inscripciones',
            type: 'item',
            icon: 'help_center',
            url: '/reportes/preinscripciones',
          },
          {
            id: 'ConsultaPreInscripcionCurso',
            title: 'Consulta de Cursos PreInscripciones',
            type: 'item',
            icon: 'help_center',
            url: '/reportes/preinscripciones-cursos',
          },
          {
            id: 'ConsultaInscripcion',
            title: 'Consulta Inscripciones',
            type: 'item',
            icon: 'help_center',
            url: '/reportes/inscripciones',
          },
          {
            id: 'ConsultaExamenesRendidos',
            title: 'Consulta Examenes Rendidos',
            type: 'item',
            icon: 'help_center',
            url: '/reportes/examenesrendidos',
          },
        ],
      }
    );
  if (tipoUsuario === '2')
    rutas.push({
      id: 'docentes',
      title: 'mis procesos',
      type: 'group',
      icon: 'apps',
      children: [
        {
          id: 'cursosDocentes',
          title: 'Mis cursos',
          type: 'item',
          icon: 'library_books',
          url: '/docente/cursos',
        },
        {
          id: 'asistenciaCursosDocentes',
          title: 'Asistencia por Estudiante',
          type: 'item',
          icon: 'list_alt',
          url: '/docente/reporte/asistencia',
        },
        {
          id: 'enlacesMeetCursos',
          title: 'Enlaces meet por curso',
          type: 'item',
          icon: 'phone_link',
          url: '/docente/links',
        },
      ],
    });
  if (tipoUsuario === '3')
    rutas.push({
      id: 'estudiante',
      title: 'mis procesos',
      type: 'group',
      icon: 'apps',
      children: [
        {
          id: 'cursosEstudiantes',
          title: 'Mis cursos',
          type: 'item',
          icon: 'library_books',
          url: '/estudiante/cursos',
        },
        {
          id: 'examenes',
          title: 'Examenes',
          type: 'item',
          icon: 'history_edu',
          url: '/estudiante/examenes',
        },
        {
          id: 'miAsistencia',
          title: 'Mi asistencia',
          type: 'item',
          icon: 'fact_check',
          url: '/estudiante/asistencia',
        },
        {
          id: 'misPagos',
          title: 'Mis pagos',
          type: 'item',
          icon: 'local_atm',
          url: '/estudiante/pagos',
        },
        {
          id: 'misNotas',
          title: 'Mis notas',
          type: 'item',
          icon: 'find_in_page',
          url: '/estudiante/notas',
        },
      ],
    });
  return rutas;
};

export default navigationConfig;
