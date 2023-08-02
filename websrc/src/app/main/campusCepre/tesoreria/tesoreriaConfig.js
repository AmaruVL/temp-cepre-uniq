import TesoreriaCompromisosPago from './index';
import CiclosTesoreria from './ciclosTesoreria/index'

const TesoreriaConfig = {
  settings: {
    layout: {
      config: {footer: {
        display: false,
      },},
    },
  },
  routes: [
    {
      path: '/tesoreria/:idCiclo',
      component: TesoreriaCompromisosPago,
    },
    {
      path: '/tesoreria',
      component: CiclosTesoreria,
    },
  ],
};

export default TesoreriaConfig;
