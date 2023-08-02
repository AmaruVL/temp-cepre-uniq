import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FormularioCiclos from './formFechas';

function ReporteExamenesRendidosHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  return (
    <div className="">
      <div className="">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Reporte de examenes rendidos por ciclo
        </Typography>
      </div>
      <FormularioCiclos
        dataCursos={props.dataCursos}
        setDataCursos={props.setDataCursos}
        setDataEstudiante={props.setDataEstudiante}
        setCurso={props.setCurso}
      />
    </div>
  );
}

export default ReporteExamenesRendidosHeader;
