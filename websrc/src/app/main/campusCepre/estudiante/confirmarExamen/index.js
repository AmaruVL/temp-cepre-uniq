import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RutaGeneral, { idUsuario } from 'app/shared-components/rutaGeneral';
import ConfirmarExamenHeader from './componentes/Header';
import ConfirmarExamenContent from './componentes/Content';

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

function ConfirmarExamenes(props) {
  const [dataExamen, setDataExamen] = useState({
    denominacion: '',
    total_preguntas: 0,
    puntaje_ok: 0.0,
    puntaje_no_ok: 0.0,
    puntaje_blanco: 0.0,
    id_examen_grupo: 0,
    esta_iniciado: false,
    mensaje: 'Loading...',
  });
  const [dataCargada, setDataCargada] = useState(false);
  const { idExamen } = props.match.params;
  useEffect(() => {
    axios
      .get(`${RutaGeneral}/estudiante/examen/detalle-examen/${idUsuario}/${idExamen}`)
      .then((res) => {
        setDataExamen(res.data);
        setDataCargada(true);
      });
  }, []);
  return (
    <Root
      header={<ConfirmarExamenHeader dataExamen={dataExamen} setDataExamen={setDataExamen} />}
      content={
        <ConfirmarExamenContent
          dataExamen={dataExamen}
          setDataExamen={setDataExamen}
          dataCargada={dataCargada}
        />
      }
      innerScroll
    />
  );
}

export default ConfirmarExamenes;
