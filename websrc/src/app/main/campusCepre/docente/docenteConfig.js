import CursosDocente from './cursosDocente/index';
import DetalleCurso from './detalleCurso/index';
import ReporteAsistenciaDocente from './consultaAsistencia/index';
import LinkMeetCursosDocente from './linkMeetCursosDocente/index';

const DocenteConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/docente/reporte/asistencia',
      component: ReporteAsistenciaDocente,
    },
    {
      path: '/docente/cursos/:idHorario/:idDocente',
      component: DetalleCurso,
    },
    {
      path: '/docente/cursos',
      component: CursosDocente,
    },
    {
      path: '/docente/links',
      component: LinkMeetCursosDocente,
    },
  ],
};

export default DocenteConfig;
