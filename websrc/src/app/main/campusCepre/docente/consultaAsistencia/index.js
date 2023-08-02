import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
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

function ReporteAsistenciaDocente() {
  const [dataCursos, setDataCursos] = useState([]);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  const [dataEstudiante, setDataEstudiante] = useState([]);
  const [fechaIn, setFechaIn] = useState();
  const [fechaFin, setFechaFin] = useState();
  const [curso, setCurso] = useState();
  useEffect(() => {
    axios.get(`${RutaGeneral}/docente/inicio/${idUsuario}`).then((res) => {
      setDataCursos(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
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

export default ReporteAsistenciaDocente;
