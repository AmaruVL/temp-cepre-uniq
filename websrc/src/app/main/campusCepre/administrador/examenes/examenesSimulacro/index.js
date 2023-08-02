import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ExamenesSimulacroHeader from './componentes/Header';
import ExamenesSimulacroContent from './componentes/Content';

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
const ExamenesSimulacroPorGrupo = (props) => {
  const [datosExamenes, setDatosExamenes] = useState({ ciclos: [], examenes: [] });
  const [estadoCiclos, setEstadoCiclos] = useState([]);
  const [estado, setEstado] = useState(false);
  const [term, setTerm] = useState('');
  const { idExamen } = props.match.params;
  // useEffect(() => {
  //   axios.get(`${RutaGeneral}/ciclos`).then((res) => {
  //     setEstadoCiclos(res.data);
  //     setEstado(true);
  //   });
  // }, [estado]);
  return (
    <Root
      header={
        <ExamenesSimulacroHeader
          datosExamenes={datosExamenes}
          setDatosExamenes={setDatosExamenes}
          estadoCiclos={estadoCiclos}
          setTerm={setTerm}
          idExamen={idExamen}
        />
      }
      content={
        <ExamenesSimulacroContent
          datosExamenes={datosExamenes}
          setDatosExamenes={setDatosExamenes}
          estadoCiclos={estadoCiclos}
          term={term}
          idExamen={idExamen}
        />
      }
      innerScroll
    />
  );
};
export default ExamenesSimulacroPorGrupo;
