import PadronCursos from './padronCursos/index';
import Ciclo from './ciclo/index';
import GrupoAcademico from './grupoAcademico/index';
import CursoGrupo from './cursoGrupo/index';
import Examenes from './examenes/index';
import PagosCiclo from './pagosCiclo/index';
import ConsultaInscripcion from './consultas/inscripcion/index';
import ConsultaPreInscripcion from './consultas/preInscripcion/index';
import Horarios from './horarios/index';
import ListaInscritosCiclo from './consultas/inscripcion/listaInscritosCiclo';
import AsignacionEstudiante from './asignarEstudiante/index';
import SincronizarAulas from './infraestructura/sincronizarAulas/index';
import SincronizarEscuelaProfesional from './infraestructura/sincronizarEscuelaProfesional/index';
import SincronizarPabellon from './infraestructura/sincronizarPabellones/index';
import ExamenesSimulacroPorGrupo from './examenes/examenesSimulacro/index';
import Docentes from './docentes/index';
import PadronRequisitos from './padronRequisitos/index';
import ListaCSVEstudiantes from './descargarCSVEstudiantes/index';
import Administradores from './usuarioAdministrador/index';
import SubirCSVNotas from './subirCSVnotas';
import ReportePreInscritos from './reportes/preInscritosEstudiantes';
import ReporteInscritos from './reportes/Inscritos';
import ReporteExamenesRendidos from './reportes/examenesRendidos';
import AsignacionDeEstudiantes from './asignacionDeEstudiantes';
import Configuracion from './configuracion';
import ReporteAsistenciaDocente from './consultaAsistencia';
import ReportePreInscritosCursos from './reportes/preInscritosCursos';

const AdministradorConfig = {
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
      path: '/padroncursos',
      component: PadronCursos,
    },
    {
      path: '/ciclo',
      component: Ciclo,
    },
    // {
    //   path: '/asignacion/estudiantes',
    //   component: AsignacionEstudiante,
    // },
    {
      path: '/asignacion/estudiantes',
      component: AsignacionDeEstudiantes,
    },
    {
      path: '/grupoacademico',
      component: GrupoAcademico,
    },
    {
      path: '/cursogrupo',
      component: CursoGrupo,
    },
    {
      path: '/examenes',
      component: Examenes,
    },
    {
      path: '/examenessimulacro/:idExamen',
      component: ExamenesSimulacroPorGrupo,
    },
    {
      path: '/pagosciclo',
      component: PagosCiclo,
    },
    {
      path: '/horarios',
      component: Horarios,
    },
    {
      path: '/consultainscripcion',
      component: ConsultaInscripcion,
    },
    {
      path: '/inscripciones/:idCiclo',
      component: ListaInscritosCiclo,
    },
    {
      path: '/consultapreinscripcion',
      component: ConsultaPreInscripcion,
    },
    {
      path: '/sincronizarescuelas',
      component: SincronizarEscuelaProfesional,
    },
    {
      path: '/sincronizarpabellon',
      component: SincronizarPabellon,
    },
    {
      path: '/sincronizaraulas',
      component: SincronizarAulas,
    },
    {
      path: '/docentes',
      component: Docentes,
    },
    {
      path: '/administradores',
      component: Administradores,
    },
    {
      path: '/padronrequisitos',
      component: PadronRequisitos,
    },
    {
      path: '/listacsv',
      component: ListaCSVEstudiantes,
    },
    {
      path: '/csvnotas',
      component: SubirCSVNotas,
    },
    {
      path: '/configuraciones',
      component: Configuracion,
    },
    {
      path: '/reportes/preinscripciones',
      component: ReportePreInscritos,
    },
    {
      path: '/reportes/inscripciones',
      component: ReporteInscritos,
    },
    {
      path: '/reportes/examenesrendidos',
      component: ReporteExamenesRendidos,
    },
    {
      path: '/reportes/preinscripciones-cursos',
      component: ReportePreInscritosCursos,
    },
    {
      path: '/reportes/preinscripciones',
      component: ReportePreInscritos,
    },
    {
      path: '/reportes/inscripciones',
      component: ReporteInscritos,
    },
    {
      path: '/reportes/examenesrendidos',
      component: ReporteExamenesRendidos,
    },
    {
      path: '/reportes/asistencia/docente',
      component: ReporteAsistenciaDocente,
    },
  ],
};

export default AdministradorConfig;
