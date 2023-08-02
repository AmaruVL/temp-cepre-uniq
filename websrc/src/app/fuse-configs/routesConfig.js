import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import InscripcionConfig from 'app/main/inscripion/InscripcionConfig';
import PreInscripcionConfig from 'app/main/preinscripcion/PreInscripcionConfig';
import CampusCEPRE from 'app/main/campusCepre/campusConfig';
import AdministradorConfig from '../main/campusCepre/administrador/administradorConfig';
import TesoreriaConfig from '../main/campusCepre/tesoreria/tesoreriaConfig';
import PreinscritosConfig from '../main/campusCepre/preinscritos/preinscritosConfig';
import DocenteConfig from '../main/campusCepre/docente/docenteConfig';
import DocenteEsperaConfig from '../main/docenteEspera/docenteEsperaConfig';
import EstudianteConfig from '../main/campusCepre/estudiante/EstudianteConfig';

const routeConfigs = [
  ExampleConfig,
  InscripcionConfig,
  PreInscripcionConfig,
  CampusCEPRE,
  AdministradorConfig,
  TesoreriaConfig,
  PreinscritosConfig,
  DocenteEsperaConfig,
  DocenteConfig,
  EstudianteConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/preinscripcion/" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
