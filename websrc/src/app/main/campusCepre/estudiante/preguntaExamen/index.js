import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
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

function PreguntaExamenes(props) {
  const [dataCursos, setDataCursos] = useState([]);
  const [term, setTerm] = useState('');
  const { idPregunta } = props.match.params;
  // console.log('asd', props.match.params);
  const [dataCargada, setDataCargada] = useState(false);
  const [dataPreguntas, setDataPreguntas] = useState(
    {
      id: 1,
      name: 'Cuanto es 1+1',
      imagen: '',
      // imagen:
      //   'https://www.neurochispas.com/wp-content/uploads/2021/03/como-es-un-triangulo-equilatero.png?ezimgfmt=ng:webp/ngcb84',
      alternativa1: '1',
      alternativa2: '3',
      alternativa3: '11',
      alternativa4: '2',
      // estado: false,
    }
    // {
    //   id: 2,
    //   name: 'Pregunta 2',
    //   alternativa1: 'a',
    //   alternativa2: 'b',
    //   alternativa3: 'c',
    //   alternativa4: 'd',
    //   estado: true,
    // },
    // {
    //   id: 3,
    //   name: 'Pregunta 3',
    //   alternativa1: 'a',
    //   alternativa2: 'b',
    //   alternativa3: 'c',
    //   alternativa4: 'd',
    //   estado: true,
    // },
    // {
    //   id: 4,
    //   name: 'Pregunta 4',
    //   alternativa1: 'a',
    //   alternativa2: 'b',
    //   alternativa3: 'c',
    //   alternativa4: 'd',
    //   estado: false,
    // },
  );
  function encontrarDetalleExamen(arreglo) {
    // console.log(dataExamen.find((examen) => examen.id === );
    return arreglo.find((pregunta) => pregunta.id === parseInt(idPregunta, 10));
  }
  // useEffect(() => {
  //   axios.get(`${RutaGeneral}/estudiante/inicio/${idUsuario}`).then((res) => {
  //     setDataCursos(res.data);
  //     console.log(res.data);
  //     setDataCargada(true);
  //   });
  // }, [dataCargada]);
  return (
    <Root
      header={<ConfirmarExamenHeader dataPreguntas={dataPreguntas} numeroPregunta={idPregunta} />}
      content={
        <ConfirmarExamenContent
          dataPreguntas={dataPreguntas}
          numeroPregunta={idPregunta}
          term={term}
          // examen={encontrarDetalleExamen(dataPreguntas)}
        />
      }
      innerScroll
    />
  );
}

export default PreguntaExamenes;
