import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ListaDocumentosInscritosCicloHeader from './inscritosPorCiclo/HeaderInscritos';
import ListaDocumentosInscritosCicloContent from './inscritosPorCiclo/ContentInscritos';

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
const ListaInscritosCiclo = (props) => {
  const [datosPadronCurso, setDatosPadronCurso] = useState([]);
  const [term, setTerm] = useState('');
  const { idCiclo } = props.match.params;

  return (
    <Root
      header={
        <ListaDocumentosInscritosCicloHeader
          datosPadronCurso={datosPadronCurso}
          setDatosPadronCurso={setDatosPadronCurso}
          setTerm={setTerm}
        />
      }
      content={
        <ListaDocumentosInscritosCicloContent
          datosPadronCurso={datosPadronCurso}
          setDatosPadronCurso={setDatosPadronCurso}
          term={term}
          idCiclo={idCiclo}
        />
      }
      innerScroll
    />
  );
};
export default ListaInscritosCiclo;
