import TesoreriaCompromisosPago from './index';
import CiclosTesoreria from './ciclos/index'

const PreinscritosConfig = {
  settings: {
    layout: {
      config: {footer: {
        display: false,
      },},
    },
  },
  routes: [
    {
      path: '/preinscritos/:idCiclo',
      component: TesoreriaCompromisosPago,
    },
    {
      path: '/preinscritos',
      component: CiclosTesoreria,
    },
  ],
};

export default PreinscritosConfig;
