import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { Redirect } from 'react-router';
import { useAuth } from 'react-oidc-context';
import ExamenesHeader from './componentes/Header';
import ExamenesContent from './componentes/Content';

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
const Examenes = () => {
  const [datosExamenes, setDatosExamenes] = useState([]);
  const [estadoCiclos, setEstadoCiclos] = useState([]);
  const [estado, setEstado] = useState(false);
  const [term, setTerm] = useState('');
  const auth = useAuth();
  useEffect(() => {
    axios.get(`${RutaGeneral}/ciclos`).then((res) => {
      setEstadoCiclos(res.data);
      setEstado(true);
    });
  }, [estado]);

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
          <ExamenesHeader
            datosExamenes={datosExamenes}
            setDatosExamenes={setDatosExamenes}
            estadoCiclos={estadoCiclos}
            setTerm={setTerm}
          />
        }
        content={
          <ExamenesContent
            datosExamenes={datosExamenes}
            setDatosExamenes={setDatosExamenes}
            estadoCiclos={estadoCiclos}
            term={term}
          />
        }
        innerScroll
      />
    );
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
};
export default Examenes;
