import PreInscripcion from './index';
import FormulariosPreInscripcion from './formulariosPreinscripcion/index';

const PreInscripcionConfig = {
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
      path: '/preinscripcion',
      component: PreInscripcion,
    },
    // {
    //   path: '/prinscripcionporciclo',
    //   component: PreInscripcion,
    // },
    {
      path: '/prinscripcion/:ciclo',
      component: FormulariosPreInscripcion,
    },
  ],
};

export default PreInscripcionConfig;
