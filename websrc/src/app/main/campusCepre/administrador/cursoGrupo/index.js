import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { useAuth } from 'react-oidc-context';
import { Redirect } from 'react-router';
import CursoGrupoHeader from './componentes/Header';
import CursoGrupoContent from './componentes/Content';

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
const CursoGrupo = () => {
  const [datosPadronCursoGrupo, setDatosPadronCurso] = useState([]);
  const [estadoCursos, setEstadoCursos] = useState([]);
  const [estadoGrupos, setEstadoGrupos] = useState([]);
  const [estado, setEstado] = useState(false);
  const [term, setTerm] = useState('');
  const auth = useAuth();
  useEffect(() => {
    axios.get(`${RutaGeneral}/padron-cursos`).then((res) => {
      setEstadoCursos(res.data);
    });
    axios.get(`${RutaGeneral}/grupos-academicos`).then((res) => {
      setEstadoGrupos(res.data);
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
          <CursoGrupoHeader
            datosPadronCursoGrupo={datosPadronCursoGrupo}
            setDatosPadronCursoGrupo={setDatosPadronCurso}
            estadoCursos={estadoCursos}
            estadoGrupos={estadoGrupos}
            setTerm={setTerm}
          />
        }
        content={
          <CursoGrupoContent
            datosPadronCursoGrupo={datosPadronCursoGrupo}
            setDatosPadronCursoGrupo={setDatosPadronCurso}
            estadoCursos={estadoCursos}
            estadoGrupos={estadoGrupos}
            term={term}
          />
        }
        innerScroll
      />
    );
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
};
export default CursoGrupo;
