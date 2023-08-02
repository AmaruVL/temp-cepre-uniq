import PaginaEsperaDocente from './paginaEsperaDocente/index';

const DocenteEsperaConfig = {
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
      path: '/paginaespera',
      component: PaginaEsperaDocente,
    },
  ],
};

export default DocenteEsperaConfig;
