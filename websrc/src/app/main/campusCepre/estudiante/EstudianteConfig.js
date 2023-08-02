import CursosEstudiante from './cursosEstudiante/index';
import DetalleCurso from './detalleCurso/index';
import ReporteAsistenciaEstudiante from './asistenciaEstudiante/index';
import PagosEstudiantes from './pagosEstudiante/index';
import NotasEstudiante from './MisNotasEstudiante/index';
import Examenes from './examenes';
import ConfirmarExamenes from './confirmarExamen';
import PreguntaExamenes from './preguntaExamen';

const EstudianteConfig = {
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
      path: '/estudiante/cursos/:idHorario/:idEstudiante',
      component: DetalleCurso,
    },
    {
      path: '/estudiante/cursos',
      component: CursosEstudiante,
    },
    {
      path: '/estudiante/asistencia',
      component: ReporteAsistenciaEstudiante,
    },
    {
      path: '/estudiante/pagos',
      component: PagosEstudiantes,
    },
    {
      path: '/estudiante/notas',
      component: NotasEstudiante,
    },
    {
      path: '/estudiante/examenes',
      component: Examenes,
    },
    {
      path: '/estudiante/dar/examen/:idExamen',
      component: ConfirmarExamenes,
    },
    {
      path: '/estudiante/examen/pregunta/:idPregunta',
      component: PreguntaExamenes,
    },
    {
      path: '/estudiante/examenes',
      component: Examenes,
    },
    {
      path: '/estudiante/dar/examen/:idExamen',
      component: ConfirmarExamenes,
    },
    {
      path: '/estudiante/examen/pregunta/:idPregunta',
      component: PreguntaExamenes,
    },
  ],
};

export default EstudianteConfig;
