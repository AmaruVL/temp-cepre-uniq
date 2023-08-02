import Inscripcion from './index';

const InscripcionConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/inscripcion/:ciclo',
      component: Inscripcion,
    },
  ],
};

export default InscripcionConfig;
