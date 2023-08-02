import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import AsistenciaEstudianteHeader from './componentes/Header';
import AsistenciaEstudianteContent from './componentes/Content';

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

function AsistenciaEstudiantes() {
  const [dataAsistencia, setDataAsistencia] = useState([]);
  const [dataCursos, setDataCursos] = useState([]);
  const [cursoElegido, setCursoElegido] = useState(null);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  const idEstudiante = idUsuario;
  useEffect(() => {
    axios.get(`${RutaGeneral}/estudiante/inicio/${idEstudiante}`).then((res) => {
      setDataCursos(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  return (
    <Root
      header={
        <AsistenciaEstudianteHeader
          dataAsistencia={dataAsistencia}
          setDataAsistencia={setDataAsistencia}
          setTerm={setTerm}
          dataCursos={dataCursos}
          idEstudiante={idEstudiante}
          setCursoElegido={setCursoElegido}
        />
      }
      content={
        <AsistenciaEstudianteContent
          dataAsistencia={dataAsistencia}
          setDataAsistencia={setDataAsistencia}
          term={term}
          cursoElegido={cursoElegido}
        />
      }
      innerScroll
    />
  );
}

export default AsistenciaEstudiantes;
