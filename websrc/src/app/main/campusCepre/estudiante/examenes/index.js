import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import axios from 'axios';
import ListaExamenesHeader from './componentes/Header';
import ListaExamenesContent from './componentes/Content';

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

function Examenes() {
  const [dataCursos, setDataCursos] = useState([]);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  console.log(idUsuario);

  useEffect(() => {
    axios.get(`${RutaGeneral}/estudiante/examen/ver-examenes/${idUsuario}`).then((res) => {
      setDataCursos(res.data);
    });
  }, []);
  return (
    <Root
      header={
        <ListaExamenesHeader
          dataCursos={dataCursos}
          setDataCursos={setDataCursos}
          setTerm={setTerm}
        />
      }
      content={
        <ListaExamenesContent dataCursos={dataCursos} setDataCursos={setDataCursos} term={term} />
      }
      innerScroll
    />
  );
}

export default Examenes;
