import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral from 'app/shared-components/rutaGeneral';
import ReporteAsistenciaEstudiantesHeader from './componentes/Header';
import ReporteAsistenciaEstudiantesBody from './componentes/Content';
import { Redirect } from 'react-router';
import { useAuth } from 'react-oidc-context';

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

function ReporteAsistenciaDocente() {
  const [dataDocente, setDataDocentes] = useState([]);
  const [dataCiclo, setDataCiclo] = useState([]);
  const [dataGeneral, setdataGeneral] = useState([]);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiante, setDataEstudiante] = useState([]);
  const [fechaIn, setFechaIn] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [curso, setCurso] = useState();
  const auth = useAuth();
  useEffect(() => {
    axios.get(`${RutaGeneral}/docentes`).then((res) => {
      setDataDocentes(res.data);
    });
    axios.get(`${RutaGeneral}/ciclos-activo`).then((res) => {
      setDataCiclo(res.data);
      setDataCargada(true);
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
            dataDocente={dataDocente}
            dataCiclo={dataCiclo}
            setDataDocentes={setDataDocentes}
            setTerm={setTerm}
            setDataEstudiante={setDataEstudiante}
            setFechaIn={setFechaIn}
            setFechaFin={setFechaFin}
            setdataGeneral={setdataGeneral}
            setCurso={setCurso}
          />
        }
        content={
          <ReporteAsistenciaEstudiantesBody
            dataCursos={dataDocente}
            dataGeneral={dataGeneral}
            dataEstudiante={dataEstudiante}
            setDataEstudiante={setDataEstudiante}
            setDataCursos={setDataDocentes}
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

export default ReporteAsistenciaDocente;
