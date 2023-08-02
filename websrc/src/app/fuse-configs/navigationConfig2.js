import { useEffect, useState } from 'react';

const useNavigationConfig = () => {
  const [Rutas, setRutas] = useState([]);
  // const tipoUsuario = sessionStorage.getItem('usuario');
  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem('usuario');

      if (item) {
        setRutas(getRutas(item));
      }
    }

    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);
  const getRutas = (tipoUsuario) => {
    const rutas = [];
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
              icon: 'content_paste',
              url: '/tesoreria',
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
              icon: 'content_paste',
              url: '/padroncursos',
            },
            {
              id: 'ciclo',
              title: 'Ciclo',
              type: 'item',
              icon: 'content_paste',
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
              icon: 'content_paste',
              url: '/cursogrupo',
            },
            // {
            //   id: 'examenes',
            //   title: 'Examenes',
            //   type: 'item',
            //   icon: 'content_paste',
            //   url: '/examenes',
            // },
            {
              id: 'asignacionEstudiante',
              title: 'Asignacion de Estudiantes a Curso',
              type: 'item',
              icon: 'content_paste',
              url: '/asignacion/estudiantes',
            },
            {
              id: 'pagosCiclo',
              title: 'Pagos por Ciclo',
              type: 'item',
              icon: 'content_paste',
              url: '/pagosciclo',
            },
            {
              id: 'horarios',
              title: 'Horarios',
              type: 'item',
              icon: 'content_paste',
              url: '/horarios',
            },
            {
              id: 'ConsultaInscripcion',
              title: 'Revisar Documentos Inscripcion',
              type: 'item',
              icon: 'content_paste',
              url: '/consultainscripcion',
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
              icon: 'content_paste',
              url: '/sincronizarescuelas',
            },
            {
              id: 'pabellon',
              title: 'Pabellon',
              type: 'item',
              icon: 'content_paste',
              url: '/sincronizarpabellon',
            },
            {
              id: 'aulas',
              title: 'Aulas',
              type: 'item',
              icon: 'content_paste',
              url: '/sincronizaraulas',
            },
          ],
        },

        {
          id: 'consultasAdmin',
          title: 'Consultas',
          type: 'group',
          icon: 'apps',
          children: [
            {
              id: 'consultaPreInscripcion',
              title: 'Consulta Pre Inscripcion',
              type: 'item',
              icon: 'content_paste',
              url: '/consultapreinscripcion',
            },
          ],
        }
      );
    if (tipoUsuario === '2')
      rutas.push({
        id: 'docentes',
        title: 'Docente',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'cursosDocentes',
            title: 'Mis cursos',
            type: 'item',
            icon: 'content_paste',
            url: '/docente/cursos',
          },
          {
            id: 'asistenciaCursosDocentes',
            title: 'Asistencia por Estudiante',
            type: 'item',
            icon: 'content_paste',
            url: '/docente/reporte/asistencia',
          },
          {
            id: 'enlacesMeetCursos',
            title: 'Enlaces meet por curso',
            type: 'item',
            icon: 'content_paste',
            url: '/docente/links',
          },
        ],
      });
    if (tipoUsuario === '3')
      rutas.push({
        id: 'estudiante',
        title: 'Estudiante',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'cursosEstudiantes',
            title: 'Mis cursos',
            type: 'item',
            icon: 'content_paste',
            url: '/estudiante/cursos',
          },
          {
            id: 'examenes',
            title: 'Examenes',
            type: 'item',
            icon: 'content_paste',
            url: '/estudiante/examenes',
          },
          {
            id: 'miAsistencia',
            title: 'Mi asistencia',
            type: 'item',
            icon: 'content_paste',
            url: '/estudiante/asistencia',
          },
          {
            id: 'misPagos',
            title: 'Mis pagos',
            type: 'item',
            icon: 'content_paste',
            url: '/estudiante/pagos',
          },
        ],
      });
    return rutas;
  };
  return Rutas;
};

export default useNavigationConfig;
