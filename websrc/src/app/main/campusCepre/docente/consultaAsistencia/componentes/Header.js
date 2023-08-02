import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FormularioFechas from './formFechas';

function ReporteAsistenciaEstudiantesHeader(props) {
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
          Reporte de Asistencia de Estudiantes
        </Typography>
      </div>
      <FormularioFechas
        dataCursos={props.dataCursos}
        setDataCursos={props.setDataCursos}
        setDataEstudiante={props.setDataEstudiante}
        setFechaIn={props.setFechaIn}
        setFechaFin={props.setFechaFin}
        setCurso={props.setCurso}
      />
    </div>
  );
}

export default ReporteAsistenciaEstudiantesHeader;
