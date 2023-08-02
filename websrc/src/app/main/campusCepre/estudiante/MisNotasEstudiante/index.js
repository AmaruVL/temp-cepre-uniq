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

function NotasEstudiante() {
  const [dataPagos, setDataPagos] = useState([]);
  const [term, setTerm] = useState('');
  const [dataCargada, setDataCargada] = useState(false);
  const idEstudiante = idUsuario;
  useEffect(() => {
    axios.get(`${RutaGeneral}/estudiante/ver-notas/${idEstudiante}`).then((res) => {
      setDataPagos(res.data);
      console.log(res.data);
      setDataCargada(true);
    });
  }, [dataCargada]);
  return (
    <Root
      header={<AsistenciaEstudianteHeader setTerm={setTerm} />}
      content={<AsistenciaEstudianteContent term={term} dataPagos={dataPagos} />}
      innerScroll
    />
  );
}

export default NotasEstudiante;
