import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from 'react-oidc-context';
import AdministradorHeader from './componentes/Header';
import AdministradorContent from './componentes/Content';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));
const Administradores = () => {
  const [datosPadronCurso, setDatosPadronCurso] = useState([]);
  const [term, setTerm] = useState('');
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Iniciando sesión...</div>;
    case 'signoutRedirect':
      return <div>Cerrando sesión...</div>;
  }

  if (auth.isLoading) {
    return <div>Cargando...</div>;
  }

  if (auth.error) {
    return <div>Error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <Root
        header={
          <AdministradorHeader
            datosPadronCurso={datosPadronCurso}
            setDatosPadronCurso={setDatosPadronCurso}
            setTerm={setTerm}
          />
        }
        content={
          <AdministradorContent
            datosPadronCurso={datosPadronCurso}
            setDatosPadronCurso={setDatosPadronCurso}
            term={term}
          />
        }
        innerScroll
      />
    );
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
};
export default Administradores;
