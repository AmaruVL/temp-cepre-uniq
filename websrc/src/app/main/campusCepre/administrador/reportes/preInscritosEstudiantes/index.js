import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import { Redirect } from 'react-router';
import { useAuth } from 'react-oidc-context';
import ReporteAsistenciaEstudiantesHeader from './componentes/Header';
import ReporteAsistenciaEstudiantesBody from './componentes/Content';

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

function ReportePreInscritos() {
  const [dataCursos, setDataCursos] = useState([]);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiante, setDataEstudiante] = useState([]);
  const [fechaIn, setFechaIn] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [curso, setCurso] = useState();
  const [escuelasProfesionales, setEscuelasProfesionales] = useState([]);

  const auth = useAuth();
  useEffect(() => {
    axios.get(`${RutaGeneral}/examen/parcial/subir-notas/ver-ciclos`).then((res) => {
      setDataCursos(res.data);
      setDataCargada(true);
    });
    axios.get(`${RutaGeneral}/escuelas-profesionales`).then((res) => {
      setEscuelasProfesionales(res.data);
    });
  }, [dataCargada]);

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
          <ReporteAsistenciaEstudiantesHeader
            dataCursos={dataCursos}
            setDataCursos={setDataCursos}
            setTerm={setTerm}
            setDataEstudiante={setDataEstudiante}
            setFechaIn={setFechaIn}
            setFechaFin={setFechaFin}
            setCurso={setCurso}
            escuelasProfesionales={escuelasProfesionales}
          />
        }
        content={
          <ReporteAsistenciaEstudiantesBody
            dataCursos={dataCursos}
            dataEstudiante={dataEstudiante}
            setDataEstudiante={setDataEstudiante}
            setDataCursos={setDataCursos}
            term={term}
            fechaIn={fechaIn}
            fechaFin={fechaFin}
            curso={curso}
          />
        }
        innerScroll
      />
    );
  }
  return <Redirect to={{ pathname: '/paginaespera' }} />;
}

export default ReportePreInscritos;
